import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Motion, spring, presets} from 'react-motion';

import CSS from './modal.module.scss';
import Close from '../close/close';

// eslint-disable-next-line react/no-deprecated
export default class Modal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visibility: 'hidden',
			display: 'none',
			active: props.active
		};

		this.handleRest = this.handleRest.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	static propTypes = {
		active: PropTypes.bool,
		onClose: PropTypes.func,
		onShow: PropTypes.func,
		children: PropTypes.node,
		size: PropTypes.string,
		showClose: PropTypes.bool,
		classname: PropTypes.string,
		fogOpacity: PropTypes.number,
		height: PropTypes.number,
		width: PropTypes.number,
		backgroundColor: PropTypes.string,
		windowHeight: PropTypes.number.isRequired
	};

	static defaultProps = {
		active: false,
		onClose: () => {},
		onShow: () => {},
		children: null,
		size: null,
		showClose: false,
		classname: '',
		fogOpacity: 0.7,
		height: 0,
		width: 0,
		backgroundColor: '#FAFAFA'
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.active) {
			this.setState({
				visibility: 'visible',
				display: 'block',
				active: true
			});

			document.querySelector('body').classList.add('modal-open');
		}

		if (nextProps.active === false) {
			this.setState({
				active: false
			});

			document.querySelector('body').classList.remove('modal-open');
		}
	}

	handleRest() {
		const {active} = this.state;

		if (!active) {
			return this.setState({
				visibility: 'hidden',
				display: 'none'
			});
		}

		return this.props.onShow();
	}

	handleClose() {
		document.querySelector('body').classList.remove('modal-open');
		this.props.onClose();
	}

	render() {
		const {children, size, showClose, classname, fogOpacity, height, width, backgroundColor, windowHeight} = this.props;
		const {visibility, display, active} = this.state;

		const wrapClass = [CSS.wrap, classname && classname !== '' ? CSS[classname] : ''];
		const modalClass = [CSS.modal, size ? CSS[size] : ''];

		let top = -1;
		let closePosition = {};

		if (height && width) {
			top = (windowHeight - height) / 2;
			closePosition = {
				right: -40,
				top: top > 40 ? -40 : 0
			};
		}

		return (
			<div className={wrapClass.join(' ')} style={{visibility}} data-size={size}>
				<Motion
					defaultStyle={{
						opacity: 0,
						x: 0.8,
						y: 0.8,
						top: 4
					}}
					style={{
						opacity: active ? spring(1, presets.stiff) : spring(0, presets.stiff),
						x: active ? spring(1, presets.stiff) : spring(0.8, presets.stiff),
						y: active ? spring(1, presets.stiff) : spring(0.8, presets.stiff),
						top: active ? spring(top > -1 ? top : 10, presets.stiff) : spring(4, presets.stiff)
					}}
					onRest={this.handleRest}
				>
					{styles => {
						const modalStyle = {
							visibility: visibility,
							display: display,
							opacity: styles.opacity,
							top: top > -1 ? styles.top : `${styles.top}%`,
							backgroundColor: backgroundColor,
							transform: `scaleX(${styles.x}) scaleY(${styles.y})`
						};

						if (height > 0) {
							modalStyle.height = height;
							modalStyle.overflow = 'visible';
						}

						if (width > 0) {
							modalStyle.width = width;
							modalStyle.overflow = 'visible';
						}

						return (
							<Fragment>
								<div className={modalClass.join(' ')} style={modalStyle}>
									<div className={CSS.modalInner}>
										{showClose ? (
											<span style={{opacity: styles.opacity > 0 ? styles.opacity : 0, ...closePosition}} className={CSS.close}>
												<Close backgroundColor="#FAFAFA" onClick={this.handleClose}/>
											</span>
										) : null}
										<div className={CSS.modalScroll}>{children}</div>
									</div>
								</div>
							</Fragment>
						);
					}}
				</Motion>
				<Motion
					defaultStyle={{
						opacity: 0
					}}
					style={{
						opacity: active ? spring(fogOpacity, presets.stiff) : spring(0, presets.stiff)
					}}
				>
					{styles => {
						return (
							<div
								className={CSS.fog}
								style={{
									visibility: visibility,
									opacity: styles.opacity
								}}
								onClick={this.handleClose}
							/>
						);
					}}
				</Motion>
			</div>
		);
	}
}
