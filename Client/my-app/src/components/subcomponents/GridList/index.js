import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const styles = theme => ({
  root: {
    padding:20,
    margin :20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height:'400px'
  },
  subheader: {
    width: '100%',
  },
});

function ImageGridList(props) {
  const { classes } = props;
  const {image_prev}=props
  return (
    <div className={classes.root}>
      <GridList  className={classes.gridList} cols={3}>
        {image_prev.map(item => (
          <GridListTile  cols={1} key={item}>
            <img src={item} alt={item}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  image_prev: PropTypes.array.isRequired
};

export default withStyles(styles)(ImageGridList);