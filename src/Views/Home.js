/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Wrapper } from '../Components/FlexBox'
import BottomNav from '../Components/BottomNav'

import First from './Home/First'
import Second from './Home/Second'

import Dispatcher from '../Models/Dispatcher'
import {setHomeSectionIndex} from '../Models/Actions/StateActions'

const Home = ({homeSectionIndex,actions})=>(
    <Wrapper>
        { homeSectionIndex === 0 ? <First /> : <Second/> }
        <BottomNav onTap={(index)=>actions.setHomeSectionIndex(index)}
                   index={homeSectionIndex} />
    </Wrapper>
);

export default connect((state)=>({
    homeSectionIndex:state.StateReducer.homeSectionIndex
}),Dispatcher({
    setHomeSectionIndex
}))(Home)