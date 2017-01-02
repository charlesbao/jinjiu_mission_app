/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import { Box } from './FlexBox'
import Slider from "react-slick"

import "../Styles/Carousel.css"
import _375X200 from '../assets/_375X200.png'

const style = {
    height:document.body.offsetWidth/2
}
class Carousel extends Component {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        let settings = {
            dots: true,
            autoplay:true,
            autoplaySpeed:5000,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
        };
        const imagesArr = [
            "http://img.zcool.cn/community/0123fe57f855b2a84a0e282b318c2e.jpg",
            "http://img.zcool.cn/community/01e33657b9610e0000018c1b01b576.jpg",
            "http://img.zcool.cn/community/01939956cfbc6c6ac7252ce6c802f6.jpg"
        ]
        return (
            <Box>
                <Box className="search-wrapper">
                    <Box className="search-wrapper--bar" onTouchTap={this.props.onSearchBarTap}>
                        <i className="search-wrapper--icon ion-ios-search-strong"/>
                        <span style={{fontSize:15}}>搜索你喜欢的任务</span>
                    </Box>
                </Box>
                <Slider {...settings}>
                    {
                        imagesArr.map((item,index)=>{
                            return <img key={index} style={style} className="slider-image" src={item} />
                        })
                    }
                </Slider>
            </Box>
        );
    }
}

export default Carousel;