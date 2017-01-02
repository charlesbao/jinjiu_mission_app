import React, { Component } from 'react';
import { Box } from './FlexBox'
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'

import CONSTANTS from '../Constants'
/*
<FlatButton
style={missionButton}
labelStyle={{color:"rgba(0, 0, 0, 0.541176)"}}
label="查看全部任务"
onTouchTap={()=>onTap(CONSTANTS.MISSION_CONDITION.ALL)}/>
*/
const MissionButtonGroup = ({onTap})=>(
    <Paper>
        <Box style={wrapper}>
            <Box style={title}>我的任务</Box>

        </Box>
        <Divider />
        <IconFlatButton label="进行中" iconClassName="ion-document-text"
                        onTap={()=>onTap(CONSTANTS.MISSION_CONDITION.ON_PROGRESS)} />
        <IconFlatButton label="审核中" iconClassName="ion-clock"
                        onTap={()=>onTap(CONSTANTS.MISSION_CONDITION.ON_CHECKING)} />
        <IconFlatButton label="已完成" iconClassName="ion-flag"
                        onTap={()=>onTap(CONSTANTS.MISSION_CONDITION.ON_FINISH)} />
    </Paper>
);

const IconFlatButton = ({label,iconClassName,onTap})=>(
    <FlatButton
        style={button}
        label={label}
        labelStyle={{paddingLeft: 16}}
        icon={<FontIcon style={icon} className={iconClassName} />}
        onTouchTap={onTap}
    />
);

const wrapper = {
    position:"relative"
}

const missionButton = {
    position: "absolute",
    right: 0,
    top: 0
}
const button = {
    width:"33.333333%",
    height:"auto",
    padding:"10px 0",
    lineHeight: "20px",
    color:"rgba(0, 0, 0, 0.541176)",
    borderRadius:0
};
const icon = {
    display:"block",
    fontSize:30,
    marginLeft:0
};

const title = {
    color:"rgba(0, 0, 0, 0.7)",
    lineHeight:"36px",
    paddingLeft:16,
    fontWeight: 500,
    fontSize: 16
};

export default MissionButtonGroup;