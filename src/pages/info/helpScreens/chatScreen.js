import { View, Text, StyleSheet } from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat, InputToolbar, Bubble, Send } from "react-native-gifted-chat";
import useAuth from "../../../hooks/useAuth";
import useChats from "../../../hooks/useChats";
import { createdAt } from "expo-updates";
import i18n from "i18n-js";

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const { auth, updateUser, socket } = useAuth();
  const { sendChat } = useChats();
  const {  getMessagesUser} = useChats();
  const [user, setUser] = useState({
    id: auth.user._id,
  });

  useEffect(() => {
    setUser({
      id: auth.user._id,
    });
    auth.user;
  }, [auth]);

  
  useEffect(() => {
    getMessages();
  }, [])

  useEffect(()=>{
    socket.emit('join', auth.user._id);
    socket.on("newMessage", (message) => {
      if(message.user._id === "-1"){
        message.avatar = "https://i.ibb.co/Gp0PMBY/admin2.png";
        message.name = "nickname";
      } 
      console.log(message);
      setMessages([message, ... messages]);
    });
  },[messages])

  const getMessages = async () => {
    let chat = await getMessagesUser(
      auth.user._id
    );
    if(chat!= null && chat != undefined){
      var mensajes = []
      for (let i = chat.data.messages.length-1; i >= 0; i--) {
        if( chat.data.messages[i].user._id != "-1"){
          mensajes.push({
            _id: chat.data.messages[i]._id,
            text: chat.data.messages[i].text,
            createdAt: chat.data.messages[i].createdAt,
            user:{
              _id: chat.data.messages[i].user._id,
            name: 'nickname',
            avatar: 'YourimageURL',
            }
          })
        }
        else{
        mensajes.push({
          _id: chat.data.messages[i]._id,
          text: chat.data.messages[i].text,
          createdAt: chat.data.messages[i].createdAt,
          user:{
            _id: chat.data.messages[i].user._id,
          name: 'nickname',
          avatar: 'https://i.ibb.co/Gp0PMBY/admin2.png',
          }
        })
      }
      }
       setMessages(
        mensajes
      )
    }
  };


  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#f3edff",
          borderColor: "#c0a2fc",
          borderWidth: 1,
          borderRadius: 100,
          padding: 1,
          renderSend: () => {
            return (
              <Text style={{ fontSize: 15, color: "#c0a2fc" }}>{i18n.t("report.send")}</Text>
            );
          },
        }}
        textStyle={{
          color: 'black',
          fontFamily: "Montserrat-Regular",
        }}       
      />
    );
  };



  const customBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: 'black',
            fontFamily: "Montserrat-Regular",
          },
          right: {
            color: 'black',
            fontFamily: "Montserrat-Regular",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#4aa7f0',
          },
          right: {
            backgroundColor: '#e2d4ff',
          },
        }}
        timeTextStyle={{
          left: { 
            color: 'black',
            fontFamily: "Montserrat-Regular",
          },
          right: { 
            color: 'black',
            fontFamily: "Montserrat-Regular",
          },
        }}
        timeFormat="HH:mm"
      />
    );
  };

  const customSend = props => {
    return (
      <Send
        {...props}
        textStyle={{
          color: "black",
          fontFamily: "Montserrat-Regular",
          borderWidth: 0,
        }}
        containerStyle={{
          marginRight: 5,
          marginTop: 1,
          borderWidth: 2,
          borderColor: "#b491fa",
          borderRadius: 100,
          backgroundColor: "#e2d4ff",
        }}
      />
    );
  };

  const onSend = async (message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
    message = { ...message[0], chat_id: auth.user._id, position: "right" };
    delete message._id
    socket.emit("sendMessage", message);
  };

  return (
    <View style={{ backgroundColor: "#f5f2fc", flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.user._id,
        }}
        renderSystemMessage={props => customSystemMessage(props)}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderBubble={props => customBubble(props)}
        renderSend={props => customSend(props)}
      />
    </View>
  );
}

export { ChatScreen };