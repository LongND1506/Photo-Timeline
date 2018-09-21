import React,{Component} from 'react'
import connect from 'react-redux/lib/connect/connect';
import CustomInput from '../CustomInput'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import * as actions from '../../../actions'
import { TextField } from '@material-ui/core';
class ChangePasswordFormDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            old_password:'',
            new_password:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.baseState=this.state
    }
    resetForm=()=>{
        this.setState(this.baseState)
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    handleClick(){
        this.props.handleClose()
        this.resetForm()
        this.props.changepassword(this.state)
    }
    render(){
        const {classes}=this.props
        const {isOpen}=this.props
        return(
            <Dialog
             open={isOpen}
             onClose={()=>{this.props.handleClose();this.resetForm()}}
             aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                <DialogContent>
                        <TextField
                         fullWidth
                         type='password' 
                         label='Current password' 
                         name='old_password'
                         onChange={this.handleChange}
                         value={this.state.old_password}
                        />
                        <TextField type='password'
                         fullWidth
                         label='New password' 
                         name='new_password' 
                         onChange={this.handleChange}
                         value={this.state.new_password}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClick} style={{outline:'none'}} color="primary">
                            Change
                        </Button>
                    </DialogActions>
            </Dialog>
        )
    }
}
const mapStateToProps=(state)=>{
    return{

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        changepassword:(data)=>dispatch(actions.changePassword(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordFormDialog)
