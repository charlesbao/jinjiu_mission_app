/**
 * Created by chalresbao on 16/12/23.
 */
import React from 'react'
import {Box} from '../../../Components/FlexBox'

const First = ({instruction,tutorial})=>(
    <Box className="mission-detail-first--wrapper">
        <Box className="mission-detail-first--title">
            <i className="mission-detail-first--icon" />
            <span>任务说明</span>
        </Box>
        <Box className="mission-detail-first--content">{instruction}</Box>
        <Box className="mission-detail-first--title">
            <i className="mission-detail-first--icon" />
            <span>步骤说明</span>
        </Box>
        <Box className="mission-detail-first--content">{tutorial}</Box>
    </Box>
)

export default First;