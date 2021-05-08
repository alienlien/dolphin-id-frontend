import React from 'react'
import { PropTypes } from 'prop-types'

function LoadImageDataButton(props) {
    return <button
        name='LoadImagedata'
        value='Load Image Data'
        onClick={props.loadData}
    >
        Load Image Data
    </button>
}

LoadImageDataButton.propTypes = {
    loadRegions: PropTypes.func,
}

export default LoadImageDataButton