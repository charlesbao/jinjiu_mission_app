/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import LoadingMask from '../../Components/LoadingMask'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'

import PostAction from '../../Actions/PostActions'
import ActionType from '../../Constants/ActionType'
import Constants from '../../Constants'

class NicknameSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            nickname:this.props.user.get('nickname')
        };

    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            const state = this.context.store.getState()
            console.log(state.UserReducer.error)
            if(state.UserReducer.error == Constants.ERROR.UPDATE_USER_INFO_FAILED){
                alert('修改失败')
            }
            this.setState({
                loading:false
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render() {
        return (
            <ContainerWithBackBar title="昵称">
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={{padding:15}}>
                        <TextField
                            fullWidth={true}
                            hintText="输入昵称"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.nickname}
                            floatingLabelText="更改昵称"
                            floatingLabelFixed={true}
                        />
                        <Box style={{paddingTop:15}}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="修 改" secondary={true} fullWidth={true} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleChange(evt,newValue){
        this.setState({
            nickname:newValue
        })
    }

    onTapHandle(){
        this.props.postUpdateUser(this.state.nickname)
        this.setState({
            loading:true
        })
    }
}

NicknameSection.contextTypes = {
    store: React.PropTypes.object
};

const mapState = (state)=>{
    return {
        user: state.UserReducer.user
    }
};


const mapDispatch = (dispatch)=>{
    return {
        postUpdateUser:(nickname)=>{
            PostAction.postUpdateUserInfo({nickname:nickname},(currentUser)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_UPDATE_USER_INFO,
                    user:currentUser
                })
            })
        }
    }
}


export default connect(mapState,mapDispatch)(NicknameSection)