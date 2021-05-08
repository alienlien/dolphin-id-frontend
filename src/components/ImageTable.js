import PropTypes from 'prop-types'
import React from 'react';
import * as c from '../const'

function ImageTable(props) {
    let colorStyle = {
        background: c.COLOR_DEFAULT,
    }

	return (
        <table id='Test Image Table'>
            <thead>
        		<tr>
                    <th key='1'>Image Trip Date</th>
                    <th key='2'>Image Trip Number</th>
        		</tr>
        	</thead>
            <tbody>
                <tr 
                    key='Image Row'
                    style={colorStyle}
                    >
                    <td>
                        <input 
                            type='date' 
                            name='trip_date' 
                            min='2000-01-01' 
                            max='2099-12-31'
                            value={props.image.tripDate}
                            onChange={props.setImageTripDate}
                        ></input>
                    </td>
                    <td>
                        <input 
                            type='number' 
                            name='trip_number'  
                            value={props.image.tripNum} 
                            onChange={props.setImageTripNumber}
                        ></input>
                    </td>
             	</tr>
            </tbody>
        </table>
    )
}

ImageTable.propTypes = {
	region: PropTypes.shape({
        data: PropTypes.object,
        setTripDate: PropTypes.func,
        setTripNumber: PropTypes.func,
	})
}


export default ImageTable