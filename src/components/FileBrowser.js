import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ConnectedFileBrowserItem from '../containers/ConnectedFileBrowserItem'

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export default function FileBrowser(props) {
    const classes = useStyles();

    let contents = props.fileContents.map(
        content => <ConnectedFileBrowserItem 
            id={content.id}
            tp={content.tp}
            path={content.path}
            contents={content.contents}
            key={content.id.toString()}
        />
    )

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {contents}
        </TreeView>
    )
}
