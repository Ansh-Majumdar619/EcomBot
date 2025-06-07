# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





ecom-sales-chatbot/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── auth_routes.py
│   │   │   ├── chatbot_routes.py
│   │   │   └── product_routes.py
│   │   ├── controllers/
│   │   │   ├── auth_controller.py
│   │   │   ├── chatbot_controller.py
│   │   │   └── product_controller.py
│   │   ├── models/
│   │   │   ├── user_model.py
│   │   │   ├── product_model.py
│   │   │   └── chat_model.py
│   │   ├── utils/
│   │   │   ├── jwt_handler.py
│   │   │   └── response_formatter.py
│   │   └── config.py
│   ├── requirements.txt
│   ├── run.py
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Chatbot.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── Home.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── .env
│   └── vite.config.js
│
├── README.md
├── .gitignore
└── package.json (root or inside frontend/)








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
        `${import.meta.env.VITE_API_URL}/chat`, // ✅ Using .env variable
        { message: innerHtml }
      );
      const botMessage = { sender: 'bot', message: response.data.reply };
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
