/**
 * Created by chalresbao on 16/12/23.
 */
import React from 'react'

const LoadingMask = ({show})=>{
    if(show){
        return (
            <div className="loading-mask">
                <div className="loading">
                    <i className="ion-ios-ionic-outline" />
                </div>
            </div>
        )
    }else{
        return <div></div>
    }
}

export default LoadingMask;