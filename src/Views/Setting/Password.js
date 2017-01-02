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
import Constants from '../../Constants'
import ActionType from '../../Constants/ActionType'
const styles = {
    wrapper: {
        padding: 15
    },
    buttonGroup: {
        paddingTop:15
    }
}
class PasswordSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            password:"",
            newPassword:"",
            re_newPassword:""
        };

    }

    componentDidMount(){
        this.unsubscribe = this.context.store.subscribe(()=>{
            const state = this.context.store.getState()
            console.log(state.UserReducer.error)
            if(state.UserReducer.error == Constants.ERROR.UPDATE_USER_INFO_FAILED){
                alert('密码错误')
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
            <ContainerWithBackBar title="账户密码">
                <LoadingMask show={this.state.loading} />
                <ScrollView style={{top:45}}>
                    <Box style={styles.wrapper}>
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="输入原密码"
                            value={this.state.password}
                            onChange={this.handleChange.bind(this,'password')}
                            floatingLabelText="原密码"
                            floatingLabelFixed={true}
                        />
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="输入新密码"
                            value={this.state.newPassword}
                            onChange={this.handleChange.bind(this,'newPassword')}
                            floatingLabelText="新密码"
                            floatingLabelFixed={true}
                        />
                        <TextField
                            fullWidth={true}
                            type="password"
                            hintText="确认新密码"
                            value={this.state.re_newPassword}
                            onChange={this.handleChange.bind(this,'re_newPassword')}
                            floatingLabelText="确认密码"
                            floatingLabelFixed={true}
                        />
                        <Box style={styles.buttonGroup}>
                            <RaisedButton onTouchTap={this.onTapHandle.bind(this)} label="修 改" secondary={true} fullWidth={true} />
                        </Box>
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    handleChange(key,evt,newValue){
        let dict = {};
        dict[key] = newValue
        this.setState(dict)
    }

    onTapHandle(){
        this.props.postUpdateUser(this.props.user.get('username'),this.state.password,this.state.newPassword)
        this.setState({
            loading:true
        })
    }
}

PasswordSection.contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
};

const mapState = (state)=>{
    return {
        user: state.UserReducer.user
    }
};


const mapDispatch = (dispatch)=>{
    return {
        postUpdateUser:(username,password,newPassword)=>{
            PostAction.postUpdatePassword(username,password,newPassword,(currentUser)=>{
                dispatch({
                    type:ActionType.USER_ACTIONS.POST_UPDATE_USER_INFO,
                    user:currentUser
                })
            })
        }
    }
}
export default connect(mapState,mapDispatch)(PasswordSection)