import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ImageLightbox from '../ImageLightbox'
import EditFormDialog from '../EditFormDialog'
import AddImageFormDialog from '../AddImageFormDialog'
import {connect} from 'react-redux'
import * as actions from '../../../actions'
class AlbumMenu extends React.Component {
  state = {
    anchorEl: null,
    isImageLightboxOpen:false,
    isEditFormDialogOpen:false,
    isAddImageFormDialogOpen:false 
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleDeleteAlbum = () => {
    this.setState({ anchorEl: null },()=>{
        this.props.deleteAlbum(this.props.album._id)
    });
  }
  //View full screen handle
  handleOpenViewFullScreen=()=>{
    this.setState({
        anchorEl:null,
        isImageLightboxOpen:true
    })
  }
  handleCloseViewFullScreen=()=>{
      this.setState({
          isImageLightboxOpen:false
      })
  }
  //Edit Form Dialog handle 
  handleOpenEditFormDialog=()=>{
    this.setState({
        anchorEl:null,
        isEditFormDialogOpen:true
    })
  }
  handleCloseEditFormDialog=()=>{
    this.setState({
        isEditFormDialogOpen:false
    })
  }
  //Add image form handle
  handleOpenAddImageFormDialog=()=>{
    this.setState({
      anchorEl:null,
      isAddImageFormDialogOpen:true
    })
  }
  handleCloseAddImageFormDialog=()=>{
    this.setState({
      isAddImageFormDialogOpen:false
    })
  }
  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton 
         style={{outline:'none',color:'#fff'}} 
         aria-owns={anchorEl ? 'simple-menu' : null}
         aria-haspopup="true"
         onClick={this.handleClick}>
            <MoreVertIcon/>    
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={()=>this.setState({anchorEl:null})}
        >
          <MenuItem onClick={this.handleOpenViewFullScreen} >View Full Screen</MenuItem>
          <MenuItem onClick={this.handleOpenEditFormDialog}>Edit Title or Description</MenuItem>
          <MenuItem onClick={this.handleOpenAddImageFormDialog}>Add image</MenuItem>
          <MenuItem onClick={this.handleDeleteAlbum}>Delete</MenuItem>
        </Menu>
        <ImageLightbox 
         album={this.props.album} 
         isOpen={this.state.isImageLightboxOpen} 
         handleClose={this.handleCloseViewFullScreen}
        />
        <EditFormDialog
         album={this.props.album}
         isOpen={this.state.isEditFormDialogOpen}
         handleClose={this.handleCloseEditFormDialog}
         />
         <AddImageFormDialog
          album={this.props.album}
          isOpen={this.state.isAddImageFormDialogOpen}
          handleClose={this.handleCloseAddImageFormDialog}
         />
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
    return{
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        deleteAlbum:(data)=>dispatch(actions.deleteAlbum(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AlbumMenu);