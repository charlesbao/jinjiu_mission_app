import React, { Component } from 'react';
import pureRender from "pure-render-decorator"

import {Wrapper} from '../Components/FlexBox'
import BackNavBar from '../Components/BackNavBar'

class ContainerWithBackBarSection extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor(props){
        super(props)
    }
    render(){
        const {title,children} = this.props;
        return (
            <Wrapper>
                <BackNavBar title={title} onTap={()=>this.context.router.goBack()}/>
                {children}
            </Wrapper>
        )
    }
}

export default pureRender(ContainerWithBackBarSection)
