/**************************************************
    TITLE IMPORTS
**************************************************/
import React from 'react'
import styled from 'styled-components';

/**************************************************
    TITLE COMPONENT
**************************************************/
export default function Title({title, center}) {
    return (
        <TitleWrapper className="row" center={center}>
            <div className="col">
                <h2 className="text-title">{title}</h2>
                <div className="title-underline"></div>
            </div>
        </TitleWrapper>
    )
}

/**************************************************
    TITLE JS STYLES
**************************************************/

const TitleWrapper = styled.div`

    text-align: ${ props => props.center ? 'center' : 'left' };

    .title-underline {
        height: 0.25rem;
        width: 8rem;
        background: var(--primaryColor);
        margin: ${ props => props.center ? '0 auto' : '0' }
    }

`;