import React,{Component} from 'react'
import {VerticalTimelineElement} from 'react-vertical-timeline-component'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import ResponsiveCarousel from '../ResponsiveCarousel'
import AlbumMenu from '../AlbumMenu'
import style from './index.css'
//Convert date format to dd/mm/yyy
const convertDate=(date)=>{
    let d= new Date(date)
    return d.getHours()+':'+d.getMinutes()+' '+d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()
}

const styles = theme => ({
    title:{
        listStyle:'none'
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      outline:'none!important',
      color: 'white',
    },
  });

class TimelineElement extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const { classes } = this.props;
        const {album}=this.props
        return(
        <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={convertDate(album.dateAdded)}
        iconStyle={{ background: '#137b68', color: '#fff' }}
        >
           <GridListTile key={album} cols={1} rows={1} className={classes.title}>
            <ResponsiveCarousel album={album}/>
            <GridListTileBar
              titlePosition="top"
              actionIcon={
                <AlbumMenu album={album}/>
              }
              actionPosition="right"
              className={classes.titleBar}
            />
            <GridListTileBar
              title={<h4>{album.title}</h4>}
              subtitle={album.description?<div><b>Description: </b>{album.description}</div>:<div/>}
              titlePosition="bottom"
              style={{minHeight:60,textAlign:'top'}}
              className={classes.titleBar}
            />
          </GridListTile>
        </VerticalTimelineElement>
        )
    }
}
TimelineElement.propTypes={
    classes: PropTypes.object.isRequired,
}
const mapStateToProps=(state)=>{
    return{}
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(TimelineElement))