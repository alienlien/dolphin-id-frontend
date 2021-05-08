import PropTypes from 'prop-types'
import React from 'react';

function ExportViaDataButton(props) {
    return (
        <button 
            name='export_via_data_begin'
            onClick={props.exportViaDataBegin}
        >
        Export Via Regions Data (V1)
        </button>    
    )
}

ExportViaDataButton.propTypes = {
    exportViaDataBegin: PropTypes.func,
}

export default ExportViaDataButton