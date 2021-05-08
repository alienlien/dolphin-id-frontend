import PropTypes from 'prop-types'
import React from 'react';
import * as c from '../const'
import * as uuid from 'uuid'

function RegionRow(props) {
    let colorStyle = {
        background: c.COLOR_DEFAULT,
    }

    if (props.target 
        && props.target.index >= 0
        && props.target.index === props.region.index) {
        colorStyle.background = c.COLOR_SELECTED
    }

	return (
        <tr 
            key={props.region.index} 
            style={colorStyle}
            >
    		<td>{props.region.index}</td>
    		<td>{props.region.x.toFixed(2)}</td>
    		<td>{props.region.y.toFixed(2)}</td>
    		<td>{props.region.width.toFixed(2)}</td>
    		<td>{props.region.height.toFixed(2)}</td>
            <td>
                <input 
                    type='string' 
                    name='group_id'
                    value={props.region.data.groupId}
                    onChange={props.setGroupID}
                ></input>
            </td>
            <td>
                <input 
                    type='number' 
                    name='ku_id'
                    value={props.region.data.kuId}
                    onChange={props.setKUID}
                ></input>   
            </td>
            <td>
                {getPredictionOptions(props.region.prediction)}                    
            </td>
            <td>
                <button 
                    name='delete_button'
                    onClick={props.deleteRegion}
                >
                Delete
                </button>
            </td>
    	</tr>
    )
}

function getPredictionOptions(labels) {
    if (!labels || labels.length === 0) {
        return <select></select>
    }

    const options = labels.map(function(label) {
        console.log(label)
        const predStr = toPredStr(label.kuId, label.groupId, label.prob)
        const key = uuid.v4().slice(0, 8)
        return <option key={key}>{predStr}</option>
    })
    return <select>{options}</select>
} 

function toPredStr(kuId, groupId, prob) {
    const kuIdStr = kuId ? 'ku_' + kuId.toString() : ''
    const groupIdStr = groupId ? groupId.toString() : ''
    const probStr = prob? 'prob_' + prob.toString() : ''
    return kuIdStr + ',' + groupIdStr + ',' + probStr
}

RegionRow.propTypes = {
	region: PropTypes.shape({
		index: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
        data: PropTypes.object,
        setTripNumber: PropTypes.func,
        setGroupID: PropTypes.func,
        setKUID: PropTypes.func,
        deleteRegion: PropTypes.func,
	})
}


export default RegionRow