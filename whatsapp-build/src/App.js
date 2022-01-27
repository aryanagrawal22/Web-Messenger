import React, { useEffect, useState } from "react"
import './App.css';
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';


const lightTheme = {
  app_Background: "#dadbd3",
  sidebar_header_Background: "#ededed",
  sidebar_header_BorderRight: "lightgrey",
  sidebar_search_Background: "#f6f6f6",
  sidebarChat_Background: "#white",
  sidebarChat_Border: "#f0f0f0",
  sidebarChat_HoverBackground: "#ebebeb",
  sidebar_searchContainer_Background: "white",
  sidebar_searchInput_Background: "white",
  sidebarChat_h2TextColor: "black",
  sidebarChat_pTextColor: "grey",
  sliderSpan_Background: "#6c6c6c",
  sliderSpanInner_Background: "white",
  Chat_body_BackgroundImage: "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png",
  chat_footer_Background: "#ededed",
  chat_body_messageRecieved: "#ffffff",
  chat_body_messageSent:"#dcf8c6",
}

const darkTheme = {
  app_Background: "#090e11",
  sidebar_header_Background: "#2a2f32",
  sidebar_header_BorderRight: "#20292e",
  sidebar_search_Background: "#141b21",
  sidebarChat_Background: "#131c21",
  sidebarChat_Border: "#20292e",
  sidebarChat_HoverBackground: "#32373a",
  sidebar_searchContainer_Background: "#32373a",
  sidebar_searchInput_Background: "#32373a",
  sidebarChat_h2TextColor: "white",
  sidebarChat_pTextColor: "grey",
  sliderSpan_Background: "#141b21",
  sliderSpanInner_Background: "#aeb0b4",
  Chat_body_BackgroundImage: "https://i.ibb.co/GR2641c/1.jpg",
  chat_footer_Background: "#1f2428",
  chat_body_messageRecieved: "#202c33",
  chat_body_messageSent:"#113632",
}

const themes = {
  light: lightTheme,
  dark: darkTheme,
}

const AppDiv = styled.div`
background-color: ${props => props.theme.app_Background};
transition: all 0.4s ease;
`;

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(function(){
    axios.get("/messages/sync").then(function(response){
      setMessages(response.data);
    })
  },[])


  useEffect(function(){

    const pusher = new Pusher('8aa2bc312f332f95ff4a', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      // console.log(newMessage)
      setMessages([...messages, newMessage])
    });
    channel.bind('deleted', function(deleteMessage) {
      // console.log(deleteMessage)
      setMessages(messages.filter(item => item._id !== deleteMessage));
    });
    return function(){
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  // console.log(messages);

  const [theme, setTheme] = useState("light")

  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    <ThemeProvider theme = {themes[theme]}>
      <AppDiv className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app_body">
        {/* {console.log(user)} */}
          <Sidebar theme={theme} setTheme={setTheme} />
          <Chat messages={messages} theme={theme}/>
        </div>
      )}
      </AppDiv>
    </ThemeProvider>
  );
}

export default App;
