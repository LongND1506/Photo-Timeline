import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountBox from '@material-ui/icons/AccountBox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Lock from '@material-ui/icons/Lock';
import CameraAlt from '@material-ui/icons/CameraAlt'
import Photo from '@material-ui/icons/Photo'
import CloudUpload from '@material-ui/icons/CloudUpload'
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  font:{
      fontSize:'20px !important'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: '#ececec',
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});
const navlink={ textDecoration:'none'}
class ListMenu extends Component {
 
  state = {
    open: false,
  };

  handleClick = () => {
    this.props.openall()
    this.setState(state => ({ open: !state.open }))
   
  };
   render(){
    const { classes ,closeall} = this.props;
    return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={this.handleClick} >
          <ListItemIcon onClick={this.handleClick}>
           <CameraAlt/>
          </ListItemIcon>
          <ListItemText primary="Photo" />
          {this.state.open&&closeall ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open&&closeall} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to='/user/phototimeline' style={navlink} >
                  <ListItem button className={classes.nested} className={classes.menuItem}>
                          <ListItemIcon>
                            <Photo  className={classes.font}/>
                          </ListItemIcon>
                          <ListItemText inset primary="Photo Timeline" className={classes.font}/>
                  </ListItem>
              </NavLink>
              <NavLink to='/user/upload' style={navlink} >
                <ListItem button className={classes.nested} className={classes.menuItem}>
                        <ListItemIcon >
                          <CloudUpload  className={classes.font}/>
                        </ListItemIcon >
                        <ListItemText inset primary="Upload Photo" className={classes.font}/>
                </ListItem>
              </NavLink>
            </List>
        </Collapse>
      </List>
    </div>
  );
}
}

ListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListMenu);
