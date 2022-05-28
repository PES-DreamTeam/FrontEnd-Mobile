import React, { useContext } from "react";
import axios from "axios";
import { API_HOST } from "@env";
import { AuthContext } from "../context/authContext";


const useChats = () => { 
  const sendChat = async (messages) => {
    const response = await axios.post(`https://pes-backend-development.herokuapp.com/api/message/`, {
      chat_id: messages.chat_id,
      createdAt: messages.createdAt,
      position: messages.position,
      text: messages.text,
      user: messages.user,
    })
  }


  const getMessagesUser = async(chatId) =>{
    const response = await axios.get(`https://pes-backend-development.herokuapp.com/api/message/${chatId}
    `);
    const data = response.data
    return data
  }

  return {
    sendChat, 
    getMessagesUser,
  };
};

export default useChats;