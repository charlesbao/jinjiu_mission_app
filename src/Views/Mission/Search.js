/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Wrapper} from '../../Components/FlexBox'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar';
import ScrollView from '../../Components/ScrollView'
import MissionList from '../../Components/MissionList'
import CONSTANTS from '../../Constants'
import ActionType from '../../Constants/ActionType'

import "../../Styles/Search.css"
const styles = {
    lineHeight: {
        height:45,
        lineHeight:"46px",
        fontSize: 18
    },
    iconStyle: {
        marginTop: -1,
        marginLeft: -27,
        marginRight:0,
    }
}

class SearchSection extends Component {

    render() {
        const {searchValue,missionArray} = this.props;
        return (
            <Wrapper>
                <AppBar
                    style={styles.lineHeight}
                    iconClassNameLeft="ion-chevron-left"
                    iconStyleLeft={styles.iconStyle}
                    onLeftIconButtonTouchTap={this.backNavTapHandle.bind(this)}
                />
                <div className="search-textfield">
                    <TextField
                        value={searchValue}
                        onChange={this.changeHandle.bind(this)}
                        hintStyle={{color:"rgba(255,255,255,0.8)"}}
                        inputStyle={{color:"white"}}
                        fullWidth={true}
                        hintText="搜索你喜欢的任务"
                    />
                </div>
                <ScrollView style={{top:45}}>
                    <MissionList list={missionArray}
                                 onListTap={this.onListTapHandle.bind(this)} />
                </ScrollView>
            </Wrapper>
        )
    }

    changeHandle(event){
        this.props.setSearchValue(event.target.value)
    }

    backNavTapHandle(){
        this.props.setSearchValue('');
        this.context.router.goBack()
    }

    onListTapHandle(tapItemId){
        this.props.setCurrentMission(tapItemId)
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }
}

SearchSection.contextTypes = {
    router: React.PropTypes.object
};

const mapState = (state)=>{
    const missionArray = state.MissionReducer.missionArray;
    const searchValue = state.StateReducer.searchValue;
    let arr = [];
    if(searchValue !== ""){
        for(let i in missionArray){
            if(missionArray[i]['title'].indexOf(searchValue) !== -1){
                arr.push(missionArray[i])
            }
            if(arr.length > 10){
                break
            }
        }
    }
    return {
        missionArray: arr,
        searchValue: searchValue
    }
}

const mapDispatch = (dispatch)=>{
    return {
        setSearchValue:(inputValue)=>{
            dispatch({
                type:ActionType.STATE_ACTIONS.SET_SEARCH_VALUE,
                data:inputValue
            })
        },
        setCurrentMission:(id)=>{
            dispatch({
                type:ActionType.MISSION_ACTIONS.SET_CURRENT_MISSION,
                data:id
            })
        },
    }
}


export default connect(mapState,mapDispatch)(SearchSection)