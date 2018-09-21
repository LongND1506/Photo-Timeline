import React,{Component} from 'react'
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as actions from '../../actions'
import styled from 'styled-components'
import ImageGridList from '../subcomponents/GridList'
import Grid from '@material-ui/core/Grid';
const styles=theme=>({
    button:{
        backgroundColor: 'rgb(19, 123, 104)',
        color: '#fff',
        '&:hover':{
            backgroundColor:'#0e5a4d'
        },
        display:'block',
        marginTop:'20px',
        TextField:{
            display:'block'
        }

    }
})
class CreateAlbum extends Component{
    
   constructor(props){
       super(props)
       this.state={files:[],file_preview_url: []}
       this.handleUploadInputChange=this.handleUploadInputChange.bind(this)
       this.handleTextInputChange=this.handleTextInputChange.bind(this)
       this.handleClick=this.handleClick.bind(this)
   }
    handleUploadInputChange(e){
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
    handleTextInputChange(e){
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        },()=>console.log(this.state))
    }
    handleClick(){
      this.props.upload({
          files:this.state.files,
          title:this.state.title,
          description:this.state.description
        })
    }
    render(){
        const {classes}=this.props
        const {file_preview_url}=this.state
        console.log(this.state)
        return(
            <Grid container spacing={0}>
                <Grid item xs={4} container>
                    <Grid item xs={10}>
                        <TextField
                        fullWidth
                        className={classes.TextField}
                        variant='outlined'
                        label='Title'
                        name='title'
                        onChange={this.handleTextInputChange}
                        margin='normal'
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                        fullWidth
                        className={classes.TextField}
                        variant='outlined'
                        label='Description'
                        name='description'
                        onChange={this.handleTextInputChange}
                        margin='normal'
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <input type='file' onChange={this.handleUploadInputChange} multiple name="image"/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button 
                        variant='flat' 
                        className={classes.button} 
                        style={{outline:'none'}} 
                        onClick={this.handleClick}
                        >Upload</Button>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <ImageGridList image_prev={file_preview_url}/>
                </Grid>
            </Grid>     
        )
    }
}
CreateAlbum.propTypes = {
    classes: PropTypes.object.isRequired,
  };
   
const mapStateToProps=(state)=>{
    return{
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        upload:(data)=>dispatch(actions.upload(data))
    }
}
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(CreateAlbum))
