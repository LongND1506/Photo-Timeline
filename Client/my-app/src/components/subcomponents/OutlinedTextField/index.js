import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  })

  class OutlinedTextFields extends React.Component {

    render() {
      const { classes } = this.props;
  
      return (
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
      );
    }
  }
  
  OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OutlinedTextFields);