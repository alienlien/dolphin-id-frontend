import { connect } from 'react-redux'
import RegionTable from '../components/RegionTable'

function mapStateToProps(state) {
    return {
        regions: state.regions,
    }
}


export default connect(mapStateToProps, null)(RegionTable)