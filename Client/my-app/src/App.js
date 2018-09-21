import React, { Component } from 'react';
import {Route,withRouter, Redirect,Switch} from 'react-router-dom'
import './App.css';
import {LoadingIndicator} from './components/subcomponents/LoadingIndicator'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import "react-light-notifications/lib/main.css";
import {NotificationContainer} from 'react-light-notifications';
import AuthForm from './components/Authentication'
import HomePage from './components/HomePage';
import { actions } from './actions';
class App extends Component {
  render() {
    const {islogin}=this.props
    const {match}=this.props
    const {loading}=this.props
    return (
    <div>
      {loading?<LoadingIndicator/>:""}
      <NotificationContainer/>
      <div className="App">
        <Switch>
          <Route exact path="/" render={()=>!islogin?<AuthForm/>:<Redirect push to='/user'/>}/>
          <Route path="/user" render={()=>islogin?<HomePage/>:<Redirect push to='/'/>}/>
        </Switch>

      </div>
    </div>
    );
  }
}
App.propTypes={
  loading:PropTypes.bool.isRequired,
  islogin:PropTypes.bool.isRequired
}
const mapStateToProps=(state,props)=>{
  return{
    loading:state.global.loading,
    islogin:state.auth.islogin
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps) (App));
