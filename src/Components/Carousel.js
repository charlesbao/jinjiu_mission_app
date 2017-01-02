/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import { Box } from './FlexBox'
import Slider from "react-slick"

import "../Styles/Carousel.css"
import _375X200 from '../assets/_375X200.png'


class Carousel extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
        };
        return (
            <Box style={{height: document.body.clientWidth/1.875}}>
                <Box className="search-wrapper">
                    <Box className="search-wrapper--bar" onTouchTap={this.props.onSearchBarTap}>
                        <i className="search-wrapper--icon ion-ios-search-strong"/>
                        <span style={{fontSize:15}}>搜索你喜欢的任务</span>
                    </Box>
                </Box>
                <Slider {...settings}>
                    <img src={_375X200} className="slider-image"/>
                    <img src={_375X200} className="slider-image"/>
                    <img src={_375X200} className="slider-image"/>
                    <img src={_375X200} className="slider-image"/>
                </Slider>
            </Box>
        );
    }
}

export default Carousel;