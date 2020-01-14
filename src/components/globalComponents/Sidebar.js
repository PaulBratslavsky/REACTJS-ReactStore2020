/**************************************************
    SIDEBAR IMPORTS 
**************************************************/
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context';

/**************************************************
    SIDEBAR COMPONENT
**************************************************/
export default function Sidebar() {
    
    const context = React.useContext(ProductContext);

    /**********************************************
        FUNCTIONS
    **********************************************/
    const renderLinks = (links) => links.map( link => (
        <li key={link.id} >
            <Link 
                onClick={context.handleSidebar}
                className="sidebar-link" 
                to={link.path}>{link.text}
            </Link>
        </li>)
    );

    /**********************************************
        RETURN
    **********************************************/
    return (
        <SidebarWrapper sidebarOpen={context.sidebarOpen}>
            <ul>
                { renderLinks(context.links) }
            </ul>
        </SidebarWrapper>
    )
}

/**************************************************
    SIDEBAR JS STYLES
**************************************************/

const SidebarWrapper = styled.nav`
    
    position: fixed;
    text-align: center;
    top: 64px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: var(--mainGrey);
    border-right: none;
    transition: var(--mainTransition);
    transform: ${ ({sidebarOpen}) => sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};

    ul {
        list-style-type: none;
        padding: 0;

        .sidebar-link {
            display: block;
            font-size: 1.5rem;
            text-transform: capitalize;
            color: var(--mainBlack);
            padding: 0.5rem 1.5rem;
            background: transparent;
            transition: var(--mainTransition);
        }

        .sidebar-link:hover {
            background: var(--primaryColor);
            color: var(--mainWhite);
            padding-left: 2.5rem;  
        }
    }

    @media (min-width: 576px) {
        width: 20rem;
        border-right: 4px solid var(--primaryColor);
        text-align: left;

    }
    

`;
