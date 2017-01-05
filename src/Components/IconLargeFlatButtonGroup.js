import React, { Component } from 'react';
import { Box } from './FlexBox'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import CONSTANTS from '../Constants'

const IconFlatButtonGroup = ({onTap})=>(
    <Box style={{margin:"10px 0"}}>
        <IconFlatButton label="钱包" iconClassName="ion-android-drafts"
                        onTap={()=>onTap(CONSTANTS.ROUTER_PATH.USER.WALLET)}/>
        <IconFlatButton label="任务收藏" iconClassName="ion-android-favorite"
                        onTap={()=>onTap(CONSTANTS.ROUTER_PATH.USER.FAVOUR)}/>
        <IconFlatButton label="设置" iconClassName="ion-android-settings"
                        onTap={()=>onTap(CONSTANTS.ROUTER_PATH.USER.SETTING)}/>
        <IconFlatButton label="帮助与反馈" iconClassName="ion-android-alert"
                        onTap={()=>onTap(CONSTANTS.ROUTER_PATH.USER.SUPPORT)}/>
    </Box>
);

const IconFlatButton = ({label,iconClassName,onTap}) => (
    <FlatButton
        style={button}
        label={label}
        labelStyle={{paddingLeft: 16}}
        icon={<FontIcon style={icon} className={iconClassName} />}
        onTouchTap={onTap}
    />
);

const button = {
    width:"50%",
    height:"auto",
    padding:"10px 0",
    lineHeight: "30px",
    color:"rgba(0, 0, 0, 0.541176)",
    borderRadius:0
};
const icon = {
    display:"block",
    fontSize:40,
    marginLeft:0
};

export default IconFlatButtonGroup;