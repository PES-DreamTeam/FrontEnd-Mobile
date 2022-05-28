import { View, Text, StyleSheet } from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import useAuth from "../../../hooks/useAuth";
import useChats from "../../../hooks/useChats";
import { createdAt } from "expo-updates";

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const { auth, updateUser } = useAuth();

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
   const intervalId = setInterval(() => {
    getMessages();
  }, 1000 * 10) 
  return () => clearInterval(intervalId)
}, [])



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
          avatar: 'https://i.ibb.co/ZT1Dnrz/admin.png',
          }
        })
      }
      }
       setMessages(
        mensajes
      )
    }
  };



  const onSend = async (message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
    message = { ...message[0], chat_id: auth.user._id, position: "right" };
    await sendChat(message);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.user._id,
      }}
    />
  );
}

export { ChatScreen };