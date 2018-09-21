import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { Carousel } from 'react-responsive-carousel';
class ResponsiveCarousel extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            infiniteLoop
            autoPlay
            emulateTouch
            >
            {
                this.props.album.imagesUrl.map(element=>{
                    return(
                        <div>
                            <img width='250px' height='350' src={element}/>
                        </div>
                    )
                })
            }
            </Carousel>
        )
    }
}
export default ResponsiveCarousel