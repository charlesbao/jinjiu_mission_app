/**
 * Created by chalresbao on 16/12/23.
 */
import React,{Component} from 'react'
import MissionList from '../../../Components/MissionList'

const Third = ({list,onTap})=>{
    return (
        <div className="mission-detail-third--wrapper">
            <MissionList list={list}
                         onListTap={onTap}/>
        </div>
    )
}

export default Third;