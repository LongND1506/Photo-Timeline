import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ImageGridList from '../GridList'
import {connect} from 'react-redux'
import * as actions from '../../../actions'
 class AddImageFormDialog extends React.Component {
   constructor(props){
     super(props)
     this.state={
        files:[],
        file_preview_url:[]
     }
     this.baseState=this.state
   }
   resetForm = () => {
    this.setState(this.baseState)
  }
  handleUploadInputChange=(e)=>{
    let files_list=e.target.files
    let file_preview_array=[]
        for(let i=0;i<files_list.length;i++){
                let reader = new FileReader();
                reader.onloadend=()=>{
                    file_preview_array.push(reader.result)
                    this.setState({
                        files:files_list,
                        file_preview_url:file_preview_array
                    })
                }
               reader.readAsDataURL(files_list[i])
        }
  }
  handleAddImage=()=>{
    let albumId=this.props.album._id
    this.props.handleClose()
    this.props.addImage({
      albumId:albumId,
      files:this.state.files
    })
  }
  render() {
    let {isOpen}=this.props
    const {album}=this.props
    const {classes}=this.props
    const {file_preview_url}=this.state
    return (
      <div>
        <Dialog 
          open={isOpen}
          onClose={()=>{this.props.handleClose();this.resetForm()}}
        >
          <DialogTitle >Add image to {album.title}</DialogTitle>
          <DialogContent>
            <input type='file' onChange={this.handleUploadInputChange} multiple name="image"/>
            <ImageGridList image_prev={file_preview_url}/>  
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddImage} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
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
    addImage:(data)=>dispatch(actions.addImage(data))
  }
}
AddImageFormDialog.propTypes = {
  
};
export default connect(mapStateToProps,mapDispatchToProps)(AddImageFormDialog)