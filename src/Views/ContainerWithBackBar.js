import React  from 'react';

import {Wrapper} from '../Components/FlexBox'
import BackNavBar from '../Components/BackNavBar'

const ContainerWithBackBarSection = ({title,children},{router}) => (
    <Wrapper>
        <BackNavBar title={title} onTap={()=>router.goBack()}/>
        {children}
    </Wrapper>
);

ContainerWithBackBarSection.contextTypes = {
    router: React.PropTypes.object
};

export default ContainerWithBackBarSection
