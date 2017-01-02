/**
 * Created by chalresbao on 16/12/6.
 */
import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {Box} from '../../../Components/FlexBox'
import {List, ListItem} from 'material-ui/List';
import moment from 'moment'
import CONSTANTS from '../../../Constants'

export const MissionBottomNavBar = ({isEnd,missionButtonType,hasFavour,favourTap,missionTap})=>{
    let missionLabel = "";
    let disabled = false;
    if(isEnd){
        missionLabel = missionButtonType == CONSTANTS.MISSION_CONDITION.ON_CHECKING ? "审核中" : "任务已结束";
        disabled = true;
    }else{
        switch (missionButtonType){
            case CONSTANTS.MISSION_CONDITION.ON_PREPARE:
            default:
                missionLabel = "开始任务";
                break;
            case CONSTANTS.MISSION_CONDITION.ON_PROGRESS:
                missionLabel = "提交任务";
                break;
            case CONSTANTS.MISSION_CONDITION.ON_CHECKING:
                missionLabel = "审核中";
                disabled = true;
                break;
        }
    }


    return (
        <Box className="mission-detail-nav--wrapper">
            <RaisedButton label="收藏"
                          style={{width:"20%"}}
                          onTouchTap={favourTap}
                          icon={<FontIcon className={hasFavour ? "ion-android-favorite" : "ion-android-favorite-outline"} />}
            />
            <RaisedButton disabled={disabled}
                          label={missionLabel}
                          secondary={true}
                          onTouchTap={missionTap}
                          style={{width:"60%",float:'right'}} />
        </Box>
    )
}

export const MissionIcon = ({attribute})=>{
    let icon = "",label = "",color = "";
    switch (attribute){
        case 0:
            icon = "ion-quote";
            label = "体验";
            color = "#7E9CBE";
            break;
        case 1:
            icon = "ion-beer";
            label = "分享";
            color = "#A7CFE7";
            break;
        case 2:
            icon = "ion-person-stalker";
            label = "互动";
            color = "#70A0D9";
            break;
        default:
            icon = "ion-ribbon-b";
            label = "其他";
            color = "#7EB9B6";
            break;
    }
    return (
        <Box className="mission-detail-icon--wrapper">
            <FontIcon color={color} className={icon} />
            <div style={{color:color}}>{label}</div>
        </Box>
    )
};

export const MissionHeader = ({missionDetail})=> (
    <div id="mission--wrapper" className="mission-detail-header--wrapper">
        <Box className="mission-detail-header--title">{missionDetail['title']}</Box>
        <Box className="mission-detail-header--price">{missionDetail['price'].toFixed(2)}<span className="mission-detail-header--label">元</span></Box>
        <Box className="mission-detail-header--description">
            <Box className="mission-detail-header--left">截止日期: {moment(missionDetail['dueDate']).format('YYYY年MM月DD日')}</Box>
            <Box className="mission-detail-header--right">审核: {missionDetail['checkCycle']}小时</Box>
            <Box className="mission-detail-header--left">重复执行: {missionDetail['canBeRepeat']?"是":"否"}</Box>
            <Box className="mission-detail-header--right">剩余: {missionDetail['count']}次</Box>
        </Box>
    </div>
)

export const MissionDetailButtonGroup = ({currentDetail,onTap})=>(
    <Box style={{margin:"20px 0 10px"}}>
        <RaisedButton label={CONSTANTS.DETAIL_TABS.DETAIL}
                      primary={currentDetail == CONSTANTS.DETAIL_TABS.DETAIL}
                      buttonStyle={{borderRadius:0}}
                      style={{width:"33.3333%",boxShadow:"none"}}
                      onTouchTap={()=>onTap(CONSTANTS.DETAIL_TABS.DETAIL)}/>

        <RaisedButton label={CONSTANTS.DETAIL_TABS.EVALUATE}
                      primary={currentDetail == CONSTANTS.DETAIL_TABS.EVALUATE}
                      buttonStyle={{borderRadius:0}}
                      style={{width:"33.3333%",boxShadow:"none"}}
                      onTouchTap={()=>onTap(CONSTANTS.DETAIL_TABS.EVALUATE)}/>

        <RaisedButton label={CONSTANTS.DETAIL_TABS.RECOMMEND}
                      primary={currentDetail == CONSTANTS.DETAIL_TABS.RECOMMEND}
                      buttonStyle={{borderRadius:0}}
                      style={{width:"33.3333%",boxShadow:"none"}}
                      onTouchTap={()=>onTap(CONSTANTS.DETAIL_TABS.RECOMMEND)}/>
    </Box>
)
