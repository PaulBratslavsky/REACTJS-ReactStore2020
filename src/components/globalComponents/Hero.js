/**************************************************
    HERO IMPORTS 
**************************************************/
import React from 'react'
import styled from 'styled-components';
import mainBcg from '../../images/mainBcg.jpeg';

/**************************************************
    HERO COMPONENT
**************************************************/
export default function Hero({image, title, max, children}) {
    return (
        <HeroWrapper max={max} image={image} >
            <div className="banner">
                <h1 className="title">{title}</h1>
                {children}
            </div>
        </HeroWrapper>
    )
}

/**************************************************
    HERO JS STYLES
**************************************************/

const HeroWrapper = styled.div`

    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: ${ (props) => props.max  ? 'calc(100vh - 64px)': 'calc(60vh - 64px)'};
    color: var(--mainWhite);
    background: linear-gradient(var(--primaryRGBA), var(--primaryRGBA)), url( ${ (props) => props.image } ) no-repeat center center/cover;

    .title {
        font-size: 5rem;
        text-transform: uppercase;
        letter-spacing: var(--mainSpacing);
        text-shadow: 5px 2px 8px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 576px) {
        .title { font-size: 3rem; }
    }
`;

Hero.defaultProps = {
    image: mainBcg
}