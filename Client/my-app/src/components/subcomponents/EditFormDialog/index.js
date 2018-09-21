import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import * as actions from '../../../actions'
 class EditFormDialog extends React.Component {
   constructor(props){
     super(props)
     this.state={
      title:this.props.album.title,
      description:this.props.album.description
     }
   }
  //  componentDidUpdate(){
  //    this.setState(this.state)
  //  }
   resetForm = () => {
    this.setState({
      title:this.props.album.title,
      description:this.props.album.description
    })
  }
  handleChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
  }
  handleEditAlbum=()=>{
    this.props.handleClose()
    this.props.editAlbum({
      albumId:this.props.album._id,
      title:this.state.title,
      description:this.state.description
    })
  }
  render() {
    let {isOpen}=this.props
    const {album}=this.props
    const {classes}=this.props
    return (
      <div>
        <Dialog 
          open={isOpen}
          onClose={()=>{this.props.handleClose();this.resetForm()}}
        >
          <DialogTitle >Edit</DialogTitle>
          <DialogContent>
              <TextField
                label="Title"
                name='title'
                fullWidth
                onChange={this.handleChange}
                margin="normal"
                value={this.state.title}
              />
            <TextField
              label="Description"
              name='description'
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              value={this.state.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleEditAlbum} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const maStateToProps=(state)=>{
  return{

  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    editAlbum:(data)=>dispatch(actions.editAlbum(data))
  }
}
EditFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(maStateToProps,mapDispatchToProps)(EditFormDialog)