/**
 * Created by chalresbao on 16/12/23.
 */
import React,{Component} from 'react'
import Avatar from 'material-ui/Avatar'
import defaultAvatar from '../../../assets/avatar.png'

const Second = ({list})=>{
    return (
        <div className="mission-detail-second--wrapper">
            {
                list.map((item,index)=>(
                    <div key={index} className="mission-detail-comment--list">
                        <Avatar src={item['avatar'].get('url') || defaultAvatar} />
                        <div className="mission-detail-comment--section">
                            <div className="mission-detail-comment--nickname">{item['nickname']}</div>
                            <div className="mission-detail-comment--content">{item['content']}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Second;