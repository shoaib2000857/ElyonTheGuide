"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FaMicrophone, FaPaperPlane, FaTrashAlt, FaHome } from "react-icons/fa";
import Link from 'next/link';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(true); // Toggle chat visibility
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Text-to-Speech (TTS)
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = selectedLanguage; // Use selected language
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "bot") {
      const botMessage = messages[messages.length - 1].text;
      speak(botMessage);
    }
  }, [messages]);

  // Speech-to-Text (STT)
  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage; // Use selected language
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsRecording(false);
      if (input.trim()) {
        handleSendMessage();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopSpeechRecognition = () => {
    if (isSending) return;
    setIsSending(true);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setTimeout(() => {
      if (input.trim()) {
        handleSendMessage();
      }
      setIsSending(false);
    }, 300);
  };

  const languageMapping = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    hi: "hi-IN",
    // Add more mappings as needed
  };

  const handleSendMessage = async () => {
    const mappedLanguage = languageMapping[selectedLanguage] || "en-US"; // Default to en-US
  
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput(''); // Clear the input after sending the message
  
      try {
        const nlpResponse = await axios.post('/api/nlp', { 
          message: input, 
          conversation: messages, 
          language: mappedLanguage // Pass the mapped language code
        });
  
        console.log('NLP Response:', nlpResponse.data);
  
        const botResponse = nlpResponse.data.reply;
  
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
  
      scrollToBottom();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-tan bg-pattern">
      <div className="w-full max-w-2xl flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md border-t-4 border-gold">
        {/* Language Selector */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-2 bg-light-brown rounded-lg text-dark-brown mb-4 border-2 border-gold"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="hi">Hindi</option>
          {/* Add more language options as needed */}
        </select>

        {/* Toggle Button for Chat/Voice Mode */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="p-2 bg-dark-brown text-white rounded-lg mb-4 hover:bg-brown transition duration-300 border-2 border-gold flex items-center justify-center"
        >
          {showChat ? "Switch to Voice-Only Mode" : "Switch to Chat Mode"}
        </button>

        {/* Chat Mode */}
        {showChat && (
          <div>
            <div className="header flex justify-between items-center mb-4">
              <h2 className="text-3xl font-serif text-dark-brown text-center">
                Chat with Elyon
              </h2>
              <button
                onClick={() => setMessages([])}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 text-sm border-2 border-gold flex items-center justify-center"
              >
                <FaTrashAlt className="mr-2" /> Clear Chat History
              </button>
            </div>
            <div className="chat-messages flex flex-col space-y-4 overflow-y-auto flex-grow">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender !== "user" && (
                    <img
                      src="/cartoon avatar of Elyon, The Wise Mentor (1).png"
                      alt="Bot Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <div
                      className={`p-4 rounded-lg text-justify break-words shadow-md ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white self-end border-2 border-gold"
                          : "bg-light-brown text-dark-brown self-start border-2 border-gold"
                      }`}
                    >
                      {msg.sender === "user" ? msg.text : <ReactMarkdown>{msg.text}</ReactMarkdown>}
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        msg.sender === "user"
                          ? "text-right text-blue-400"
                          : "text-left text-dark-brown"
                      }`}
                    >
                      {msg.sender === "user" ? "You" : "Elyon"}
                    </span>
                  </div>
                  {msg.sender === "user" && (
                    <img
                      src="/a cartoon-like avatar of a single student with an ancient theme.png"
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Voice-Only Mode */}
        {!showChat && (
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
              className="p-4 bg-green-500 text-white rounded-full hover:bg-green-700 border-2 border-gold flex items-center justify-center"
            >
              {isRecording ? "Stop Recording" : <FaMicrophone />}
            </button>
            {isRecording && <p className="text-dark-brown">Listening...</p>}
          </div>
        )}

        {/* Input Box and Send Button Visible Continuously */}
        <div className="flex space-x-2 items-center mt-4">
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-4 border rounded-lg text-dark-brown bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gold"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 border-2 border-gold flex items-center justify-center"
          >
            <FaPaperPlane />
          </button>
        </div>

        {/* Return to Home Button */}
        <Link href="/" passHref>
          <button className="mt-6 bg-dark-brown text-white px-6 py-3 rounded-lg text-xl hover:bg-brown transition duration-300 border-2 border-gold flex items-center justify-center">
            <FaHome className="mr-2" /> Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}