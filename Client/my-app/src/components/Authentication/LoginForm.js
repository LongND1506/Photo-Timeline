import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Lock from '@material-ui/icons/Lock'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {style} from './style'
export const LoginForm=(props)=>{
    return(
        <div>
        <Grid container spacing={8} alignItems="flex-end" style={style.input} >
                <Grid item xs={2}>
                    <AccountCircle />
                </Grid>
                <Grid item xs={10} >
                    <TextField 
                    label="Email" 
                    name='email'
                    onChange={props.handleChange}
                    />
                </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end" style={style.input}>
                <Grid item xs={2}>
                    <Lock />
                </Grid>
                <Grid item xs={10} >
                    <TextField 
                    label="Password" 
                    type='password'
                    name='password'
                    onChange={props.handleChange}
                    />
                </Grid>
        </Grid>
        <Button variant='contained' style={style.button} fullWidth={true} onClick={props.handleClick}>
                Login 
             </Button>
         </div>
    )
}
LoginForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
  }