import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import * as ImmutableProptypes from 'react-immutable-proptypes';
import {StaggeredMotion, spring} from 'react-motion';
import {List} from 'immutable';

import CSS from './masonry.module.scss';
import {ref, debounce, chunkList} from '../../utils/componentHelpers';

const startOpacity = 0;

// Lower damping and stiffness here will exaggerate the
// Start of the sequence of animations
const initialStiffness = 400;
const initialDamping = 60;

// Lower damping and stiffness here will exaggerate the
// End of the sequence of animations
const finalStiffness = 400;
const finalDamping = 60;

export default class Masonry extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groups: []
		};

		this.resizeGridItem = this.resizeGridItem.bind(this);
		this.debounceResize = this.debounceResize.bind(this);
		this.debounceResize = debounce(this.debounceResize, 300);

		this.getDefaultStyles = this.getDefaultStyles.bind(this);
		this.getStyles = this.getStyles.bind(this);
		this.renderGroup = this.renderGroup.bind(this);
	}

	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.node).isRequired,
		columnWidth: PropTypes.number,
		autoRows: PropTypes.number,
		gridGap: PropTypes.number,
		items: ImmutableProptypes.list.isRequired,
		perGroup: PropTypes.number
	};

	static defaultProps = {
		columnWidth: 350,
		autoRows: 10,
		gridGap: 9,
		perGroup: 10
	};

	static getDerivedStateFromProps(nextProps) {
		return {
			groups: chunkList(List(nextProps.children), nextProps.perGroup).toJS()
		};
	}

	componentDidMount() {
		// Delay this so child content is rendered
		setTimeout(() => {
			this.resizeAllGridItems();
		}, 300);

		window.addEventListener('resize', this.debounceResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.debounceResize);
	}

	componentDidUpdate(prevProps) {
		if (!this.props.items.equals(prevProps.items)) {
			this.resizeAllGridItems();
		}
	}

	debounceResize() {
		this.resizeAllGridItems();
	}

	resizeAllGridItems() {
		if (!this.grid) {
			return;
		}

		[...this.grid.querySelectorAll(`.${CSS.item}`)].forEach(this.resizeGridItem);
	}

	resizeGridItem(item) {
		const computedStyle = window.getComputedStyle(this.grid);
		const rowHeight = parseInt(computedStyle.getPropertyValue('grid-auto-rows'), 10);
		const rowGap = parseInt(computedStyle.getPropertyValue('grid-row-gap'), 10);
		const inner = item.querySelector(`.${CSS.itemInner}`);
		const rowSpan = Math.ceil((inner.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
		item.style.gridRowEnd = 'span ' + rowSpan;
	}

	getDefaultStyles(children) {
		return children.map(() => {
			return {
				o: startOpacity
			};
		});
	}

	getStyles(prevInterpolatedStyles) {
		return prevInterpolatedStyles.map((_, index) => {
			if (index === 0) {
				return {o: spring(1, {stiffness: initialStiffness, damping: initialDamping})};
			}

			return {
				o: spring(prevInterpolatedStyles[index - 1].o, {stiffness: finalStiffness, damping: finalDamping})
			};
		});
	}

	render() {
		const {groups} = this.state;

		const columnWidth = window.innerWidth < this.props.columnWidth ? '100%' : this.props.columnWidth;

		const gridStyle = {
			gridTemplateColumns: `repeat(auto-fill, minmax(${columnWidth}px, 1fr))`
		};

		return (
			<div ref={ref.call(this, 'grid')} className={CSS.grid} style={gridStyle}>
				{groups.map(this.renderGroup)}
			</div>
		);
	}

	renderGroup(children, index) {
		if (children.length === 0) {
			return null;
		}

		return (
			<StaggeredMotion key={`${index}${children.length}`} defaultStyles={this.getDefaultStyles(children)} styles={this.getStyles}>
				{interpolatedStyles => {
					return (
						<Fragment>
							{interpolatedStyles.map((style, index) => {
								const child = children[index] ? children[index] : null;
								return (
									// eslint-disable-next-line react/no-array-index-key
									<div key={index} className={CSS.item} style={{opacity: style.o}}>
										<div className={CSS.itemInner}>{child}</div>
									</div>
								);
							})}
						</Fragment>
					);
				}}
			</StaggeredMotion>
		);
	}
}
