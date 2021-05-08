import { connect } from 'react-redux'
import { moveRegion, setRegionStateUnchanged, setRegionStateMove, setRegionStateResize } from '../action'
import Region from '../components/Region'
import * as c from '../const'

function getOppositeCorner(
	resizeDir,
	x,
	y,
	width,
	height) {
	switch (resizeDir) {
	    case c.LOWER_RIGHT:
			return {
				x: x,
				y: y,
			}
        case c.LOWER_LEFT:
			return {
				x: x + width,
				y: y,
			}
        case c.UPPER_LEFT:
			return {
				x: x + width,
				y: y + height,
			}
        case c.UPPER_RIGHT:
			return {
				x: x,
				y: y + height,
			}
        default:
			return {
				x: x,
				y: y,
			}
	}
}

function mapStateToProps(state) {
    return {
        target: state.target,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setRegionStateUnchangedDispatch: () => dispatch(setRegionStateUnchanged()),
        setRegionStateMoveDispatch: (index, x, y, clientPosX, clientPoxY) => dispatch(setRegionStateMove(
            index, 
            x, 
            y, 
            clientPosX, 
            clientPoxY,
        )),
        setRegionStateResizeDispatch: (index, resizeCornerDir) => {
            const oppositeCorner = getOppositeCorner(
                resizeCornerDir,
                ownProps.x,
                ownProps.y,
                ownProps.width,
                ownProps.height,
            )
            dispatch(setRegionStateResize(
                index,
                resizeCornerDir,
                oppositeCorner.x,
                oppositeCorner.y,
        ))},
        moveRegionDispatch: (index, oldClientPosX, oldClientPosY, newClientPosX, newClientPosY) => dispatch(moveRegion(
            index,
            oldClientPosX,
            oldClientPosY,
            newClientPosX,
            newClientPosY,
        )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Region)