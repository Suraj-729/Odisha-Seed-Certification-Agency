import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import SeedDetailsTable from './SeedDetailsTable';



const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [seedDetails, setSeedDetails] = useState(null);

  useEffect(() => {
    addResponseMessage("Welcome to our support chat! How can we assist you today?");
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    setMessages([...messages, { message: newMessage, sender: 'user' }]);
  
    try {
      const botResponse = await getBotResponse(newMessage);
      console.log('Bot response:', botResponse);
  
      addResponseMessage(botResponse.response);
  
      if (botResponse.seedDetails) {
        console.log('Seed details received:', botResponse.seedDetails);
        setSeedDetails(botResponse.seedDetails);
        addResponseMessage(formatSeedDetails(botResponse.seedDetails));
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  const getBotResponse = async (message) => {
    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return data;
  };

  // const formatSeedDetails = (data) => {
  //   return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
  // };

  const formatSeedDetails = (data) => {
    let formattedDetails = 'Seed Details:\n\n';
    formattedDetails += 'Key                | Value\n';
    formattedDetails += '-------------------|-------------------\n';

    Object.entries(data).forEach(([key, value]) => {
      formattedDetails += `${key.padEnd(18, ' ')} | ${String(value).padEnd(18, ' ')}\n`;
    });

    return formattedDetails;
  };

  const renderSeedDetails = () => {
    if (seedDetails) {
      return <SeedDetailsTable data={seedDetails} />;
    }
    return null;
  };

  return (
    <div className="ChatBot">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Organization Support"
        subtitle="How can we help you today?"
      />
      {renderSeedDetails()}
    </div>
  );
};

export default ChatBot;