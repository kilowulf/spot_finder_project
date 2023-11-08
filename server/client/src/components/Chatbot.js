import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { sendMessage, addUserMessage } from "../actions"; // Correct this path

function Chatbot({ messages, sendMessage, addUserMessage, username }) {
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null); // Ref for the messages container
 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();  // Scroll to bottom whenever messages update
  }, [messages]); // The dependency array ensures useEffect is called whenever 'messages' changes

  const handleSendMessage = async message => {
    // Dispatch Redux action here.
    addUserMessage(message); // Update Redux state with user's message
    sendMessage(message);
  };

  

  

  return (
    <div className="chatbot">
      {!showChat
        ? <button className="chatbot-trigger" onClick={() => setShowChat(true)}>
            Open Chatbot
          </button>
        : <div className="chat-modal">
          <button
              className="chat-modal-close-btn"
              onClick={() => setShowChat(false)}
            >
              Close (X)
            </button>
          <div className="resize-grip"></div>
            
            <div className="messages">
              {messages.map((msg, index) =>
                <div
                  key={index}
                  className={
                    msg.type === "user"
                      ? "user-message-container"
                      : "bot-message-container"
                  }
                >
                  <div className="message-header">
                    {msg.type === "user" ? username : "Spotbot"}
                  </div>
                  <p
                    className={
                      msg.type === "user" ? "user-message" : "bot-message"
                    }
                  >
                    {msg.text}
                  </p>
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
            
            <input
              type="text"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSendMessage(e.target.value);
                  e.target.value = "";
                }
              }}
              placeholder="Type your message..."
            />
            <span className="powered-by">Powered by ChatGPT</span>
          </div>}
    </div>
  );
}

// Mapping the Redux state to props to get bot's response
const mapStateToProps = state => {
  console.log("Entire Redux State:", state);
  // Get the latest message from the chatbot array.

  // You'll need to know where the bot's reply is stored in your Redux state.
  return {
    messages: state.chatbot.messages,
    botReply:
      state.chatbot.length > 0 ? state.chatbot[state.chatbot.length - 1] : null
  }; // Change the key accordingly
};

// Instead of passing the action directly, let's define it in a mapDispatchToProps function
const mapDispatchToProps = dispatch => {
  return {
    addUserMessage: message => dispatch(addUserMessage(message)),
    sendMessage: message => dispatch(sendMessage(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
