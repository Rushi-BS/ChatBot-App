import React, { useState } from "react";

export default function ConversationPage(props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [conversationTitle, setConversationTitle] = useState("Chat with Bot");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);

  const handleUserInput = (e) => {
    if (e.key === "Enter") {
      const currentInput = e.target.value;
      setMessages([...messages, { text: currentInput, sender: "user" }]);
      // Simulate bot response (you may replace this with an actual API call)
      setMessages([...messages, { text: "Sure, I'll get back to you!", sender: "bot" }]);
      setUserInput("");
    }
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setConversationTitle(e.target.value);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form1">
        <div className="Auth-form-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            {isEditingTitle ? (
              <input
                type="text"
                value={conversationTitle}
                onChange={handleTitleChange}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={handleTitleKeyDown}
                className="form-control me-2"
                style={{ flex: 1 }}
              />
            ) : (
              <h3 className="Auth-form-title" onClick={handleTitleClick}>
                {conversationTitle}
              </h3>
            )}
            <div>
              <button type="button" className="btn btn-primary me-2">
                Profile
              </button>
              <button type="button" className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>

          {/* Added a fixed height and overflow for the conversation-container */}
          <div className="conversation-container" style={{ height: "340px", overflowY: "auto" }}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
        </div>

        {/* Moved input field to the bottom */}
        <div className="form-group mt-3" style={{ position: "fixed", bottom: 105, width: "34%", padding: "15px 15px" }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="form-control mt-1"
            placeholder="Type your message here and press Enter"
            onKeyDown={handleUserInput}
          />
        </div>
      </div>
    </div>
  );
}
