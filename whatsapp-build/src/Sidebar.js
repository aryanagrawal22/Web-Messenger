import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from "./SidebarChat";
import SwitchBtn from './SwitchBtn';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import styled from "styled-components";
import { useStateValue } from './StateProvider';


const Sidebar_headerDiv = styled.div`
    background-color: ${props => props.theme.sidebar_header_Background};
    border-right: 2px solid ${props => props.theme.sidebar_header_BorderRight};
    transition: all 0.4s ease;
`;

const Sidebar_searchDiv = styled.div`
    background-color: ${props => props.theme.sidebar_search_Background};
    transition: all 0.4s ease;
`;

const Sidebar_searchContainerDiv = styled.div`
    background-color: ${props => props.theme.sidebar_searchContainer_Background};
    transition: all 0.4s ease;
`;

const Sidebar_searchInputDiv = styled.input`
    background-color: ${props => props.theme.sidebar_searchInput_Background};
    transition: all 0.4s ease;
`;

const Sidebar_chatsDiv = styled.div`
    background-color: ${props => props.theme.sidebar_search_Background};
    transition: all 0.4s ease;
`;

function Sidebar(props) {
    const [{user},dispatch] = useStateValue();

    return (
        <div className= "sidebar">
            <Sidebar_headerDiv className="sidebar_header">
            <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                <div className="sidebar_headerRight_slider">
                <IconButton>
                    <WbSunnyIcon style={props.theme==="light"?{ fill: 'orange' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                <SwitchBtn theme={props.theme} setTheme={props.setTheme}/>
                <IconButton>
                    <Brightness3Icon style={props.theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#5C5CFF'}}/>
                </IconButton>
                </div>
                <IconButton>
                    <DonutLargeIcon style={props.theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                <IconButton>
                    <ChatIcon style={props.theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon style={props.theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                    
                </div>
            </Sidebar_headerDiv>
            
            <Sidebar_searchDiv className="sidebar_search">
                <Sidebar_searchContainerDiv className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <Sidebar_searchInputDiv input placeholder="Search" type="text"/>
                </Sidebar_searchContainerDiv>
            </Sidebar_searchDiv>

            <Sidebar_chatsDiv className="sidebar_chats">
                <SidebarChat theme={props.theme} name={"FirstYear Official"} message={"Hello how are u?"} src={"https://articles.collegebol.com/wp-content/uploads/2020/01/660.jpg"}/>
                <SidebarChat name={"Coding Mates"} message={"Okay"} src={"https://www.incimages.com/uploaded_files/image/1920x1080/software-computer-code-1940x900_35196.jpg"}/>
                <SidebarChat name={"OldSchool Kids"} message={"Lets go that place then!"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlI9SmxAMlGd1xpPfnL7TYQO5aH21wmTj4HQ&usqp=CAU"}/>
            </Sidebar_chatsDiv>
        </div>
    )
}

export default Sidebar
