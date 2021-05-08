import React from 'react'
import { PropTypes } from 'prop-types'

function PredictButton(props) {
    return <button
        name='Predict'
        value='Predict Image'
        onClick={props.reqPredict}
    >
        Predict Image
    </button>
}

PredictButton.propTypes = {
    reqPredict: PropTypes.func,
}

export default PredictButton