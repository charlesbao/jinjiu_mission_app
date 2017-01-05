/**
 * Created by chalresbao on 16/12/15.
 */
import React,{Component} from 'react'
import DropZone from 'react-dropzone';

import {connect} from 'react-redux'
import {Box} from '../../Components/FlexBox'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import ScrollView from '../../Components/ScrollView'
import ContainerWithBackBar from '../ContainerWithBackBar'
import CONSTANTS from '../../Constants'
import ActionType from '../../Constants/ActionType'

class SettingSection extends Component {

    render() {
        const router = this.context.router;
        return (
            <ContainerWithBackBar title="设置">
                <ScrollView style={{top:45}}>
                    <Menu>
                        <MenuItem onTouchTap={()=>router.push(CONSTANTS.ROUTER_PATH.SETTING.SETTING_AVATAR)}
                                  primaryText="头像" />
                        <MenuItem onTouchTap={()=>router.push(CONSTANTS.ROUTER_PATH.SETTING.SETTING_NICKNAME)}
                                  primaryText="昵称" />
                        <MenuItem onTouchTap={()=>router.push(CONSTANTS.ROUTER_PATH.SETTING.SETTING_PASSWORD)}
                                  primaryText="账户密码" />
                        <MenuItem onTouchTap={()=>router.push(CONSTANTS.ROUTER_PATH.SETTING.SETTING_MOBILE,)}
                                  primaryText="绑定手机号码" />
                    </Menu>
                    <Box style={{padding:20}}>
                        <RaisedButton onTouchTap={this.clearUserInformation.bind(this)}
                                      label="退出当前账户" secondary={true} fullWidth={true} />
                    </Box>
                </ScrollView>
            </ContainerWithBackBar>
        )
    }

    clearUserInformation(){
        this.props.clear();
        this.context.router.replace(CONSTANTS.ROUTER_PATH.LOGIN)
    }

}

SettingSection.contextTypes = {
    router: React.PropTypes.object
};

export default connect(()=>({}), (dispatch)=>({
    clear(){
        dispatch({
            type:ActionType.CLEAR
        })
    }
}))(SettingSection)