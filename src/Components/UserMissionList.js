import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon'
import moment from 'moment'
import CONSTANTS from '../Constants'

import '../Styles/MissionList.css'

moment.locale('en', {
    relativeTime : {
        future: "在%s之后",
        past: "%s",
        s:  "刚刚",
        m:  "1分钟前",
        mm: "%d分钟前",
        h:  "1小时前",
        hh: "%d小时前",
        d:  "1天前",
        dd: "%d天前",
        M:  "1个月前",
        MM: "%d月前",
        y:  "1年前",
        yy: "%d年前"
    }
});

const MissionList = ({currentIndex,userMissionList,onListTap,knowMore,rePost,comment})=>(
    <div>
        {
            userMissionList.map((item,index)=> {
                const mission = item['mission'];
                const props = {
                    theMission:mission,
                    process:item['process'],
                    commentBack:item['commentBack'],
                    hasComment:item['hasComment'],

                    knowMore:()=>knowMore(item['commentBack']),
                    comment:()=>comment(item['id'],item['mission']),
                    rePost:()=>rePost(item['id'],item['mission']),
                    onListTap:()=>onListTap(mission)
                };
                switch (item['process']){
                    case CONSTANTS.MISSION_CONDITION.ON_PROGRESS:
                    case CONSTANTS.MISSION_CONDITION.ON_CHECKING:
                    case CONSTANTS.MISSION_CONDITION.ON_FINISH:
                        if(item['process'] == currentIndex){
                            return <ListItem key={index} {...props}/>
                        }
                        break;
                    case CONSTANTS.MISSION_CONDITION.ON_DESTROY:
                        if(currentIndex == CONSTANTS.MISSION_CONDITION.ON_FINISH){
                            return <ListItem key={index} {...props}/>
                        }
                        break;
                    default:
                        break;

                }
            })
        }
    </div>
);

const ListItem = ({
    theMission,
    onListTap,
    commentBack,
    process,
    hasComment,
    comment,
    knowMore,
    rePost
})=>{
    const {attribute,title,count,createdAt,price} = theMission;
    return (
        <div className="mission-list-wrapper">
            <div onTouchTap={onListTap}>
                <MissionIcon attribute={attribute}/>
                <MissionContent title={title} count={count} publishTime={createdAt} />
                <MissionFooter price={price} commentBack={commentBack} process={process} />
            </div>
            <MissionCommentBack hasComment={hasComment}
                                knowMore={knowMore}
                                rePost={rePost}
                                comment={comment}
                                process={process}
                                commentBack={commentBack} />
        </div>
    )
}

const MissionIcon = ({attribute})=>{
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
        <div className="mission-list-icon--wrapper">
            <FontIcon color={color} className={icon} />
            <div style={{color:color}}>{label}</div>
        </div>
    )
};

const MissionContent = ({title,count,publishTime})=>(
    <div className="mission-list-contentWrapper">
        <div className="mission-list-contentWrapper--title">{title}</div>
        <div className="mission-list-contentWrapper--count">剩余{count}次</div>
        <div className="mission-list-contentWrapper--publishTime">{moment(publishTime).fromNow()}</div>
    </div>
);

const MissionFooter = ({price,commentBack,process})=> {
    let comments = [];
    switch (process){
        case CONSTANTS.MISSION_CONDITION.ON_CHECKING:
            if(commentBack != ''){
                comments = <div className="mission-list-footerWrapper--commentBack">不合格</div>
            }
            break;
        case CONSTANTS.MISSION_CONDITION.ON_DESTROY:
            comments = <div className="mission-list-footerWrapper--commentBack">已失效</div>
            break;
        case CONSTANTS.MISSION_CONDITION.ON_FINISH:
            comments = <div className="mission-list-footerWrapper--commentBack">已完成</div>
            break;
        default:
            break;
    }
    return (
        <div className="mission-list-footerWrapper">
            <div className="mission-list-footerWrapper--price">{price.toFixed(2)}<span
                className="mission-list-footerWrapper--label">元</span></div>
            {comments}
        </div>
    )
};

const MissionCommentBack = ({process,commentBack,hasComment,knowMore,rePost,comment})=>{
    switch (process){
        case CONSTANTS.MISSION_CONDITION.ON_CHECKING:
            if(commentBack != ""){
                return (
                    <div className="mission-list-checkButton">
                        <div className="checkButton" onTouchTap={knowMore}>了解详情</div>
                        <div className="checkButton" onTouchTap={rePost}>重新提交</div>
                    </div>
                )
            }
            break;
        case CONSTANTS.MISSION_CONDITION.ON_FINISH:
            console.log(hasComment)
            return (
                <div className="mission-list-checkButton">
                    {
                        hasComment ?
                            <div className="checkButton-disabled">已评论</div> :
                            <div className="checkButton" onTouchTap={comment}>评论</div>
                    }
                </div>
            );
            break;

    }
    return <div></div>
}

export default MissionList