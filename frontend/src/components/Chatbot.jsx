import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (innerHtml) => {
    const userMessage = { sender: 'user', message: innerHtml };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/`,
        { message: innerHtml }
      );

      const botMessage = { sender: 'bot', message: response.data.bot_reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={{
                  message: msg.message,
                  sentTime: 'just now',
                  sender: msg.sender,
                  direction: msg.sender === 'user' ? 'outgoing' : 'incoming',
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chatbot;
