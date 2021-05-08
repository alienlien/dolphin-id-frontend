import { connect } from 'react-redux'
import Image from '../components/Image'
import * as actions from '../action'

function mapStateToProps(state) {
    return {
        src: state.fileSystem.imgSrc,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setImageMetaGen: (width, height) => {
            const meta = {
                'width': width,
                'height': height,
            }
            dispatch(actions.setImageMeta(meta))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image)
