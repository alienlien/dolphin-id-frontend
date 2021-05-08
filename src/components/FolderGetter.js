import PropTypes from 'prop-types'
import React from 'react';

function FolderGetter(props) {
    return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
            <input 
                type='string' 
                name='folder'
                value={props.rootFolder}
                onChange={props.setRootFolder}
            ></input>               
            <button 
                name='fetch_list_folder_begin'
                onClick={props.fetchListFolderBegin}
            >
            Get
            </button>    
        </div>
    )
}

FolderGetter.propTypes = {
    folder: PropTypes.string,
}

export default FolderGetter