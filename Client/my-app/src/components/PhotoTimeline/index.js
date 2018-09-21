import React,{Component} from 'react'
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import TimelineElement from '../subcomponents/VerticalTimelineElement'
import 'react-vertical-timeline-component/style.min.css';
import * as actions from '../../actions'
class PhotoTimeline extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentWillMount(){
        this.props.fetch_album()
    }
    render(){
        return(
            <div >
                  <VerticalTimeline>
                      {this.props.album_data.map(item=><TimelineElement key={item} album={item}/>)}
                  </VerticalTimeline>   
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        fetching_data:state.user.fetching_data,
        album_data:state.user.user_data.albums
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        fetch_album:()=>dispatch(actions.getAlbum())
    }
}
PhotoTimeline.propTypes={
    album_data:PropTypes.array.isRequired,
    fetching_data:PropTypes.bool.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(PhotoTimeline)