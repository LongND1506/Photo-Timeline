import React,{Component} from 'react'
import {connect} from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChangePasswordFormDialog from '../ChangePasswordFormDialog'
import * as actions from '../../../actions'
const styles = {
    flex: {
      flexGrow: 1,
    }
  }
class UserMenu extends Component{
    state={
        auth: true,
        anchorEl: null,
        isChangePasswordFormDialogOpen:false
    }
    handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    logout=()=>{
      this.props.logout(localStorage.getItem('token'))
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
      };
    //Open Change Password form dialog
    handleOpenChangePasswordFormDialog=()=>{
      this.handleClose()
      this.setState({
        isChangePasswordFormDialogOpen:true
      })}
    //Close Change Password form dialog
    handleCloseChangePasswordFormDialog=()=>{
      this.setState({
        isChangePasswordFormDialogOpen:false
      })
    }
    render(){
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <div style={{marginRight:'10%'}}>
                <IconButton
                  style={{outline:'none'}}
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                   <MenuItem onClick={this.handleOpenChangePasswordFormDialog}>Change password</MenuItem>
                  <MenuItem onClick={this.logout}>Log out</MenuItem>
                </Menu>
                <ChangePasswordFormDialog 
                    isOpen={this.state.isChangePasswordFormDialogOpen}
                    handleClose={this.handleCloseChangePasswordFormDialog}
                  />
              </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{

    } 
}
const mapDistpatchToProps=(dispatch)=>{
    return{
      logout:data=>dispatch(actions.logout(data))
    }
}
export default connect(mapStateToProps,mapDistpatchToProps)(UserMenu)