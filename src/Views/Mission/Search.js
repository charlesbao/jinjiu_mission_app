/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import {Wrapper} from '../../Components/FlexBox'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar';
import ScrollView from '../../Components/ScrollView'
import MissionList from '../../Components/MissionList'
import Alert from '../../Components/AlertDialog'
import LoadingMask from '../../Components/LoadingMask'

import CONSTANTS from '../../Constants'

import Dispatcher from '../../Models/Dispatcher'
import {setCurrentMission,queryMissionBySearch} from '../../Models/Actions/MissionActions'
import {setSearchValue,setMissionSearchScrollTop} from '../../Models/Actions/StateActions'

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
    },
    searchButton: {
        minWidth:45,
        height:40,
        color:'white'
    }
}

class SearchSection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert:null,
            loading:false
        }
    }

    render() {
        const {searchValue,missionSearchArray} = this.props;
        return (
            <Wrapper>
                <AppBar
                    style={styles.lineHeight}
                    iconClassNameLeft="ion-chevron-left"
                    iconStyleLeft={styles.iconStyle}
                    onLeftIconButtonTouchTap={this.backNavTapHandle.bind(this)}
                />
                <LoadingMask show={this.state.loading}/>
                <Alert open={this.state.alert !== null}
                       close={()=>this.setState({alert:null})}
                       content={this.state.alert}/>
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
                <div className="search-button">
                    <FlatButton style={styles.searchButton}
                                onTouchTap={this.searchHandle.bind(this)}
                                icon={<FontIcon className="ion-ios-search-strong" />}/>
                </div>
                <ScrollView ref="scroll" scrollbarShow={true} style={{top:45}}>
                    <MissionList list={missionSearchArray}
                                 onListTap={this.onListTapHandle.bind(this)} />
                </ScrollView>
            </Wrapper>
        )
    }

    changeHandle(event){
        this.props.actions.setSearchValue(event.target.value)
    }
    searchHandle(){
        this.setState({loading:true});
        this.props.actions.queryMissionBySearch(this.props.searchValue,(error)=>{
            this.setState({loading:false,alert:error});
        });
    }

    backNavTapHandle(){
        this.context.router.goBack()
    }

    onListTapHandle(currentMission){
        this.props.actions.setMissionSearchScrollTop(this.refs.scroll.getScrollTop())
        this.props.actions.setCurrentMission(currentMission);
        this.context.router.push(CONSTANTS.ROUTER_PATH.MISSION.MISSION_DETAIL)
    }
}

SearchSection.contextTypes = {
    router: React.PropTypes.object
};

export default connect(createSelector(
    state=>state.StateReducer.searchValue,
    state=>state.MissionReducer.missionSearchArray,
    state=>state.StateReducer.missionSearchScrollTop,
    state=>state.MissionReducer.loadedMissionSearchPage,
    (searchValue,missionSearchArray,missionSearchScrollTop,loadedMissionSearchPage) => ({
        searchValue,missionSearchArray,missionSearchScrollTop,loadedMissionSearchPage
    })
),Dispatcher({
    queryMissionBySearch,
    setSearchValue,
    setCurrentMission,
    setMissionSearchScrollTop
}))(SearchSection)