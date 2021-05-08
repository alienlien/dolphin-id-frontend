import React, { Component } from 'react';
import ConnectedRegion from '../containers/ConnectedRegion'
import style from './style';
import { REGION_STATE_MOVE, REGION_STATE_RESIZE }  from '../action'

class RegionSelect extends Component {

	getClientPosInImage(event, image) {
		let clientPos = this.getClientPos(event)
		const imageOffset = this.getElementOffset(image);
		const xPct = ((clientPos.x - imageOffset.left) / image.offsetWidth) * 100;
		const yPct = ((clientPos.y - imageOffset.top) / image.offsetHeight) * 100;
		return {
			x: xPct, 
			y: yPct,
		}
	}

	getClientPos(event) {
		return {
			x: event.pageX,
			y: event.pageY,
		}
	}

 	getElementOffset (element) {
 		const rect = element.getBoundingClientRect();
 		const docEl = document.documentElement;

 		const rectTop = rect.top + window.pageYOffset - docEl.clientTop;
 		const rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
 
 		return {
 			top: rectTop,
 			left: rectLeft
 		};
 	}

	isInExistedRegion(event) {
		return event.target.dataset.wrapper 
			|| event.target.dataset.dir 
	}
	 
	render () {
		return (
			<div
				ref='image'
				style={style.RegionSelect}
				tabindex='0'
				onMouseDown={
					(event) => {
						if (this.isInExistedRegion(event)) {
							return
						}

						event.preventDefault()

						const pos = this.getClientPosInImage(event, this.refs.image)
						this.props.createRegion(pos.x, pos.y, this.props.regions.length)
					}
				}
				onMouseUp={
					(event) => this.props.setRegionStateUnchangedDispatch()
				}
				onMouseMove={
					(event) => {
						event.preventDefault()
						const clientPos = this.getClientPosInImage(event, this.refs.image)

						if (this.props.target.state === REGION_STATE_RESIZE) {
							this.props.resizeRegionDispatch(
								this.props.target.index,
								event.target.dataset.dir,
								this.props.target.oppositeCornerX,
								this.props.target.oppositeCornerY,
								clientPos.x,
								clientPos.y,
							)
						} else if (this.props.target.state === REGION_STATE_MOVE) {
							this.props.moveRegionDispatch(
								this.props.target.index,
								this.props.target.oldX,
								this.props.target.oldY,
								this.props.target.clientPosX,
								this.props.target.clientPosY,
								clientPos.x,
								clientPos.y,
							)
						}
					}
				}
				>
				{this.props.children}
				{this.props.regions.map(
					(region, index) => <ConnectedRegion 
						x={region.x}
						y={region.y}
						width={region.width}
						height={region.height}
						index={index}
						key={index}
						// TODO: Send the size for the image only rather than the whole image.
						getClientPosInImage={
							(event) => this.getClientPosInImage(event, this.refs.image)
						}
						target={this.props.target}
						 >
					</ConnectedRegion>)}
			</div>
		)
	}
}

RegionSelect.propTypes = {}

export default RegionSelect
