import React from 'react';
import { PropTypes } from 'prop-types'; 
import style from './style';
import * as c from '../const';

function Region(props) {
	const localStyle = {
		width: props.width + '%',
		height: props.height + '%',
		left: props.x + '%',
		top: props.y + '%'
	};

	let corners = (
			<div>
				<div data-dir={c.LOWER_RIGHT} style={style.RegionHandleSE} />
				<div data-dir={c.LOWER_LEFT} style={style.RegionHandleSW} />
				<div data-dir={c.UPPER_LEFT} style={style.RegionHandleNW} />
				<div data-dir={c.UPPER_RIGHT} style={style.RegionHandleNE} />
			</div> 
		)

	let colorStyle = {
		background: c.COLOR_DEFAULT
	}
	if (props.target 
		&& props.target.index >= 0 
		&& props.index === props.target.index) {
		colorStyle.background = c.COLOR_SELECTED
	}

	return (
		<div
			style={Object.assign(
				{}, 
				style.Region, 
				localStyle,
				colorStyle, 
			)}
			onMouseDown={
				(event) => {
					const clientPos = props.getClientPosInImage(event)
			
				    if (event.target.dataset.dir) {
						props.setRegionStateResizeDispatch(
							props.index,
							event.target.dataset.dir,
						)
					} else {
						props.setRegionStateMoveDispatch(
							props.index,
							props.x,
							props.y,
							clientPos.x,
							clientPos.y,
						)
					}
				}
			}
			data-wrapper="wrapper"
			>
			{corners}
		</div>
	);
} 

Region.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
};

export default Region
