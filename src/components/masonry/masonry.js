import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from './masonry.module.scss';
import {ref, debounce} from '../../utils/componentHelpers';

export default class Masonry extends Component {
	constructor(props) {
		super(props);

		this.resizeGridItem = this.resizeGridItem.bind(this);
		this.debounceResize = this.debounceResize.bind(this);
		this.debounceResize = debounce(this.debounceResize, 300);
	}

	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.node).isRequired,
		columnWidth: PropTypes.number,
		autoRows: PropTypes.number,
		gridGap: PropTypes.number
	};

	static defaultProps = {
		columnWidth: 350,
		autoRows: 10,
		gridGap: 9
	};

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

	debounceResize() {
		this.resizeAllGridItems();
	}

	resizeAllGridItems() {
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

	render() {
		const gridStyle = {
			gridTemplateColumns: `repeat(auto-fill, minmax(${this.props.columnWidth}px, 1fr))`
		};

		return (
			<div ref={ref.call(this, 'grid')} className={CSS.grid} style={gridStyle}>
				{this.props.children.map((child, index) => {
					return (
						// eslint-disable-next-line react/no-array-index-key
						<div key={index} className={CSS.item}>
							<div className={CSS.itemInner}>{child}</div>
						</div>
					);
				})}
			</div>
		);
	}
}
