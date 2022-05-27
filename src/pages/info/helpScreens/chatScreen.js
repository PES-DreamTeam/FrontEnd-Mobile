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
  const { auth, updateUser } = useAuth();

  const { sendChat } = useChats();

  const [user, setUser] = useState({
    id: auth.user._id,
  });

  useEffect(() => {
    setUser({
      id: auth.user._id,
    });
    auth.user;
  }, [auth]);

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
        _id: 2,
        text: "Hello developer",
        createdAt: new Date() + 33242423432432,
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = async (message) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
    message = { ...message[0], chat_id: auth.user._id, position: "right" };
    await sendChat(message);

    // const { _id, createdAt, text, user } = messages[0];

    /*   
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
        */
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
