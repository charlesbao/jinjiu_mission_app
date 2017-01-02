/**
 * Created by chalresbao on 16/11/24.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Wrapper } from '../Components/FlexBox'
import BottomNav from '../Components/BottomNav'

import ActionType from '../Constants/ActionType'
import First from './Home/First'
import Second from './Home/Second'

class Home extends Component {

    render() {
        return (
            <Wrapper>
                {this.renderView()}
                <BottomNav onTap={this.props.handleChangeIndex}
                           index={this.props.homeSectionIndex} />
            </Wrapper>
        );
    }

    renderView(){
        switch (this.props.homeSectionIndex){
            case 0:
                return <First />;
            default:
                return <Second />;
        }
    }

}

Home.propTypes = {
    homeSectionIndex: React.PropTypes.number
};

const mapState = (state)=>({
    homeSectionIndex:state.StateReducer.homeSectionIndex
});

const mapDispatch = (dispatch)=>({
    handleChangeIndex:(index)=>{
        dispatch({
            type:ActionType.STATE_ACTIONS.SET_HOME_SECTION_INDEX,
            data:index
        })
    }
});

export default connect(mapState,mapDispatch)(Home)