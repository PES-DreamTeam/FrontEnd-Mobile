
import { View, Text, StyleSheet } from "react-native";
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import useAuth from "../../../hooks/useAuth";
import useChats from "../../../hooks/useChats";
import Icon from "react-native-vector-icons/Ionicons";
    
 function ChatScreen({navigation}) {
  useEffect(()=>{
    navigation.setOptions({headerLeft: () =>(
        <Icon name="arrow-back-outline" onPress={() => navigation.goBack()} size={25} />
)})
})
      const [messages, setMessages] = useState([]);
      const { auth, updateUser } = useAuth();

     const { sendChat } = useChats();


        const envChat = async () =>{
          await sendChat(messages[0]?.text, messages[0]?.createdAt)
        }

      const [user, setUser] = useState({
        id: auth.user._id,
      });

      useEffect(() => {
        setUser({
          id: auth.user._id,
        });
        auth.user;
      }, [auth]);

  

      console.log(messages[0]?.text)
      console.log(user)
/*
      useLayoutEffect(() => {

        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
      }, []);
    */
      useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },

          },
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0]; 
        /*   
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
        */
      }, []);
    
     
      
      return (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
         
          user={{
            _id: auth.user._id,
          }}
        />
      );
    }

export { ChatScreen };