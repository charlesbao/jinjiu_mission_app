import React, {Component} from 'react';
import pureRender from "pure-render-decorator"
import FontIcon from 'material-ui/FontIcon'
import moment from 'moment'

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

const MissionList = ({list,onListTap})=>(
    <div>
        {
            list.map((item,index)=>{
                return <ListItem key={index}
                                 onListTap={()=>onListTap(item)}
                                 theMission={item} />
            })
        }
    </div>
)

const ListItem = ({theMission,onListTap})=>{
    const {attribute,title,count,createdAt,price} = theMission;
    return (
        <div className="mission-list-wrapper" onTouchTap={onListTap}>
            <MissionIcon attribute={attribute}/>
            <MissionContent title={title} count={count} publishTime={createdAt} />
            <MissionFooter price={price}/>
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

const MissionFooter = ({price})=>(
    <div className="mission-list-footerWrapper">
        <div className="mission-list-footerWrapper--price">{price.toFixed(2)}<span className="mission-list-footerWrapper--label">元</span></div>
    </div>
);

export default pureRender(MissionList)