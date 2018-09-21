import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Lock from '@material-ui/icons/Lock'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Face from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {style} from './style'
export const SignUpForm=(props)=>{
    return(
        <div>
            <Grid container spacing={8} alignItems="flex-end" style={style.input} >
                <Grid item xs={2}>
                    <AccountCircle />
                </Grid>
                <Grid item xs={10} >
                    <TextField 
                    id="input-with-icon-grid" 
                    label="Email"  
                    fullWidth
                    required
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
                    id="input-with-icon-grid" 
                    label="Password" 
                    fullWidth
                    required
                    type='password'
                    name='password'
                    onChange={props.handleChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end" style={style.input}>
                <Grid item xs={2}>
                    <Face />
                </Grid>
                <Grid item xs={10} >
                    <TextField 
                    id="input-with-icon-grid" 
                    label="Name"  
                    fullWidth
                    required
                    type='text'
                    name='name'
                    onChange={props.handleChange}
                    />
                </Grid>
            </Grid>
            <Button variant='contained' style={style.button} fullWidth={true} onClick={props.handleClick}>
                Register 
             </Button>
        </div>
    )
}
SignUpForm.propTypes={
    handleChange:PropTypes.func.isRequired
}