/**
 * Created by chalresbao on 16/12/23.
 */
import React from 'react'
import {Box} from './FlexBox'

const LoadingMask = ({show})=>{
    if(show){
        return (
            <Box className="loading">
                Loading
            </Box>
        )
    }else{
        return <div></div>
    }
}

export default LoadingMask;