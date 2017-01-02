/**
 * Created by chalresbao on 16/12/9.
 */
import React,{Component} from 'react'
import {Box} from './FlexBox'
import RaisedButton from 'material-ui/RaisedButton';
import CONSTANTS from '../Constants'

const button = {width:"33%",boxShadow:"none"}
const border = {borderRadius:0}
const MissionDetailButtonGroup = ({currentDetail,onTap})=>(
    <Box style={{margin:"20px 0 10px"}}>
        <RaisedButton label={CONSTANTS.DETAIL_TABS.DETAIL}
                      primary={currentDetail == CONSTANTS.DETAIL_TABS.DETAIL}
                      buttonStyle={border}
                      style={button}
                      onTouchTap={()=>onTap(this,CONSTANTS.DETAIL_TABS.DETAIL)}/>

        <RaisedButton label={CONSTANTS.DETAIL_TABS.EVALUATE}
                      primary={currentDetail == CONSTANTS.DETAIL_TABS.EVALUATE}
                      buttonStyle={border}
                      style={button}
                      onTouchTap={()=>onTap(this,CONSTANTS.DETAIL_TABS.EVALUATE)}/>

        <RaisedButton label={CONSTANTS.DETAIL_TABS.RECOMMEND}
                      primary={currentDetail == CONSTANTS.DETAIL_TABS.RECOMMEND}
                      buttonStyle={border}
                      style={button}
                      onTouchTap={()=>onTap(this,CONSTANTS.DETAIL_TABS.RECOMMEND)}/>
    </Box>
)


export default MissionDetailButtonGroup