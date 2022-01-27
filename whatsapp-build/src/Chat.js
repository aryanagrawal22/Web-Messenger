import { AttachFile, SearchOutlined, SettingsInputAntenna } from '@mui/icons-material'
import MoreVert from '@mui/icons-material/MoreVert'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import "./Chat.css";
import MicIcon from '@mui/icons-material/Mic';
import axios from './axios';
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';
import { useStateValue } from './StateProvider';
import { useEffect, useRef } from "react"
import ExpandMoreIcon from '@mui/icons-material/KeyboardArrowDown';
import uuid from 'react-uuid';
import 'moment-timezone';
import moment from "moment";
import { auth } from './firebase';
import { signOut } from '@firebase/auth';

const Chat_headerDiv = styled.div`
    background-color: ${props => props.theme.sidebar_header_Background};
    .chat_headerInfoH3{
        color: ${props => props.theme.sidebarChat_h2TextColor};
    }
    .chat_headerInfoP{
        color: ${props => props.theme.sidebarChat_pTextColor};
    }
    border-bottom: ${props => props.theme.sidebar_header_BorderRight};
    transition: all 0.4s ease;
`;

const Chat_footerDiv = styled.div`
    background-color: ${props => props.theme.chat_footer_Background};
    border-top: ${props => props.theme.sidebar_header_BorderRight};
    transition: all 0.4s ease;
`;

const Chat_footerInputDiv = styled.input`
    background-color: ${props => props.theme.sidebar_searchInput_Background};
    color: ${props => props.theme.sidebarChat_h2TextColor};
    transition: all 0.4s ease;
`;

const Chat_bodyDiv = styled.div`
.chat_message{
    background-color: ${props => props.theme.chat_body_messageRecieved};
    color: ${props => props.theme.sidebarChat_h2TextColor};
    transition: all 0.4s ease;
    }
.chat_reciever{
    background-color: ${props => props.theme.chat_body_messageSent};
    transition: all 0.4s ease;
    }
.chat_name{
    color: ${props => props.theme.sidebarChat_h2TextColor};
    transition: all 0.4s ease;
    }
.chat_timestamp{
    color: ${props => props.theme.sidebarChat_h2TextColor};
    transition: all 0.4s ease;
    }
transition: all 0.4s ease;
`;

function Chat( {messages, theme} ) {
    const[slide, setSlide] = useState(true);
    const [input, setInput] = useState("");
    const [{user},dispatch] = useStateValue();
    let sent;
    const [isOpen, setIsOpen] = useState(false);
    const [idClick, setIdClick] = useState(null);
    
    function IsOpenCall(e,id){
        setIsOpen(!isOpen);
        IdClickCall(id);
        
    };
    function IdClickCall(id){
        
        setIdClick(id);
    }

    const sendMessage = async (e)=>{
        setSlide(true);
        e.preventDefault();
        const now=moment().format('h:mm a');
        const uuidCom = uuid();
        await axios.post("/messages/new", {
            message:input,
            name: user?.displayName,
            timestamp: now,
            UserId: user?.uid,
            MsgId: uuidCom,
            _id: uuidCom,
        })
        setInput("");
        
    };

    const deleteMessage = async (e, id)=>{
        setSlide(false);
        e.preventDefault();
        await axios.post("/messages/delete", {
            MsgId: id,
        })
        
    };

 

    const messagesEndRef = useRef(null);
    
        
        const scrollToBottom = () => {
             if(messages.length!=0){
                console.log(slide);
                if(slide){
                    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
                }
        }
    };
    
    
    useEffect(scrollToBottom, [messages]);



    const signOutUser = () => {signOut(auth).then(function() {
        console.log("SignOut Success")
      }).catch(function(error) {
        console.log(error)
      });}



    return (
        <div className="chat">
            <Chat_headerDiv className="chat_header">
                <Avatar src="https://cdn3.f-cdn.com/contestentries/1464034/17845176/5c55c1aae3618_thumb900.jpg"/>
                <div className="chat_headerInfo">
                    <h3 className="chat_headerInfoH3">Public Room</h3>
                    <p className="chat_headerInfoP">Last Seen...</p>
                </div>
                <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined style={theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                <IconButton>
                    <AttachFile style={theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                <IconButton>
                    <LogoutIcon onClick={signOutUser} style={theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
                </IconButton>
                </div>
            </Chat_headerDiv>
            <Scrollbars
            style={theme==="light"?{ backgroundImage: "url(" + "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png" + ")", width: "100%", height: "100%" , transition: "all 0.4s ease", overflowX:"hidden"}:{ backgroundImage : "url(" + "https://i.ibb.co/GR2641c/1.jpg" + ")", width: "100%", height: "100%", transition: "all 0.4s ease",overflowX:"hidden"}} className="area">
            
            <Chat_bodyDiv className="chat_body">
            
                {messages.map(function(message, index){
                    if(user?.uid===message.UserId){
                        sent = true;
                    }else{
                        sent = false;
                    }
                    return(
                    <p  className={`chat_message ${sent && "chat_reciever"}`}>
                        <span className="chat_name">{message.name} </span>
                        {message.message} 
                        <span className="chat_timestamp"> {message.timestamp}</span>
                        <IconButton style={{width:'20px', height:'20px'}} className='messageDropdown' onClick={e => IsOpenCall(e, index)}>
                        {/* {console.log(message.MsgId)} */}

                        {isOpen && idClick === index &&<div className={`chatMenu ${sent ? "chatMenu_sent" : "chatMenu_recieve"}`}>
                            <ul class="dropdown" aria-label="submenu">
                                <li messageId={message.MsgId} onClick={e => deleteMessage(e, message.MsgId)}>Delete</li>
                            </ul>
                        </div>}
                        
                            <ExpandMoreIcon  style={theme==="light"?{ fill: '#6b6b6b',width: '18' }:{ fill : '#aeb0b4', width: '18'}}/>
                        </IconButton>
                        <div ref={messagesEndRef} className="test"  />
                    </p>
                    
                    )
                })} 
            </Chat_bodyDiv>
            
            </Scrollbars>

            <Chat_footerDiv className="chat_footer">
              
              <IconButton>
                <InsertEmoticonIcon style={theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
              </IconButton>
              <form>
                  <Chat_footerInputDiv input value={input}
                  onChange={(e)=>setInput(e.target.value)}
                //   value={input}
                //   onChange={(e)=>setInput(e.target.value)}
                  placeholder="Type a message"
                  type="text"/>
                  <button onClick={sendMessage} type="submit">Send a message</button>
                  
               </form>
               
               <IconButton>
                <MicIcon style={theme==="light"?{ fill: '#6b6b6b' }:{ fill : '#aeb0b4'}}/>
               </IconButton>
            </Chat_footerDiv>
        </div>
    )
}

export default Chat
