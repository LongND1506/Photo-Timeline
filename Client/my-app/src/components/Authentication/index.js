import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Typography from '@material-ui/core/Typography';
import {LoginForm} from './LoginForm'
import {SignUpForm} from './SignUpForm'
class AuthForm extends Component{
    constructor(props){
        super(props)
        this.state={
            value:0,
            loading:false,
            islogin:false,
            email:"",
            password:"",
            name:""

        }
        this.handleChange=this.handleChange.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleSignUp=this.handleSignUp.bind(this)

    }
    handleChange(e){
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        },()=>{ console.log(this.state)})
     
    }
    handleLogin(){
        
        this.props.login({
            email:this.state.email,
            password:this.state.password
        })
        
    }
    handleSignUp(){
        this.props.signup({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name
        })
    }
    componentDidUpdate(prevProps){
      this.props.islogin?this.props.history.push('/user'):()=>{}
    }
    render(){
        const {value}=this.state
        return(
        <Container>
            <FormWrapper>
                <Tabs
                style={{background:'#137b68',color: '#fff'}}
                value={value} 
                fullWidth
                onChange={(e,value)=>this.setState({value})} >
                    <Tab label="Login" style={{outline:'none'}}/>
                    <Tab  label="Register" style={{outline:'none'}}/>
                </Tabs>
                <SwipeableViews
                index={this.state.value}
                onChangeIndex={(index)=>this.setState({value:index})}
                >
                    <TabContainer >
                        <LoginForm handleChange={this.handleChange} handleClick={this.handleLogin}/>
                    </TabContainer>
                    <TabContainer >
                        <SignUpForm handleChange={this.handleChange} handleClick={this.handleSignUp}/>
                    </TabContainer>
                </SwipeableViews>
            </FormWrapper>
        </Container>
        )
    }
}
AuthForm.propTypes={
    islogin:PropTypes.bool.isRequired,
    loading:PropTypes.bool.isRequired
}
const mapStateToProps=(state)=>{
    return {
        islogin:state.auth.islogin,
        loading:state.global.loading
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        login:(data)=>dispatch(actions.login(data)),
        signup:(data)=> dispatch(actions.signup(data))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthForm);

const Container=styled.div`
 
`
const FormWrapper=styled.div`
    width:25%;
    border: 1px solid rgba(108, 117, 125, 0.1);
    box-shadow: 5px 5px 15px #21252982;
    background: #f8f9fa;
    position:absolute;
    top:15%;
    left:35%;
`
const Logo=styled.img`
    width:150px;
    margin-bottom:20px;
`

const TabContainer=(props)=> {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };