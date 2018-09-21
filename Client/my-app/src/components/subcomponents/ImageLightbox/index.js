import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import * as actions from '../../../actions'
 class ImageLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
    };
  }
  handleRemoveImage=()=>{
    let imageSrc=this.props.album.imagesUrl
    let {photoIndex}=this.state
    this.props.deleteImage({
      albumId:this.props.album._id,
      imageSrc:imageSrc[photoIndex]
    })
  }
  render() {
    let {isOpen}=this.props
    const { photoIndex } = this.state;
    const images=this.props.album.imagesUrl
    return (
      <div>
        {isOpen && (
          <Lightbox
            toolbarButtons={[
              <IconButton 
                aria-label="Delete" 
                style={{color:"#b2b5b4"}}
                onClick={this.handleRemoveImage}
              >
                <DeleteIcon/>
              </IconButton>
            ]}
            clickOutsideToClose
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={this.props.handleClose}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
            // onImageLoad={(imageSrc,srcType,image)=>console.log(image)}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{

  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    deleteImage:data=>dispatch(actions.deleteImage(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageLightbox)