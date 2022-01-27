import { Avatar } from '@mui/material';
import React from 'react';
import "./SidebarChat.css";
import styled from "styled-components";

const SidebarChatDiv = styled.div`
    background-color: ${props => props.theme.sidebarChat_Background};
    border-top: 2px solid ${props => props.theme.sidebarChat_Border};
    &:hover{
        background-color: ${props => props.theme.sidebarChat_HoverBackground};
    }
    .sidebarChat_infoH2{
        color: ${props => props.theme.sidebarChat_h2TextColor};
    }
    .sidebarChat_infoP{
        color: ${props => props.theme.sidebarChat_pTextColor};
    }
    
    transition: all 0.4s ease;
`;

function SidebarChat(props) {
    return (
        <SidebarChatDiv className="sidebarChat">
            <Avatar src={props.src}/>
            <div className="sidebarChat_info">
                <h2 className="sidebarChat_infoH2">{props.name}</h2>
                <p className="sidebarChat_infoP">{props.message}</p>
            </div>
        </SidebarChatDiv>
    )
}

export default SidebarChat
