import React from 'react'
import ChatBot from 'react-simple-chatbot';

function ChatHome(){
  return (
    <ChatBot
    steps={[
      {
        id: '1',
        message: 'How can I help you?',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Issue 1', trigger: '3' },
          { value: 2, label: 'Issue 2', trigger: '4' },
          { value: 3, label: 'Others', trigger: '10' },
        ],
      },
      {
        id: '3',
        message: 'Answer 1',
        trigger: '6',
      },
      {
        id: '4',
        message: 'Answer 2',
        trigger: '6',
      },
      {
        id: '6',
        message: 'Was your issue resolved?',
        trigger: '7',
      },
      {
        id: '7',
        options: [
          { value: 1, label: 'Yes', trigger: '8' },
          { value: 2, label: 'No', trigger: '11' },
        ],
      },
      {
        id: '8',
        message: 'Awesome!',
        end: true,
      },
      {
        id: '10',
        user: true,
        trigger: '11',
      },
      {
        id: '11',
        message:'Connecting you to an agent..',
        trigger: '12',
      },
      {
        id: '12',
        user: true,
        trigger: '11',
      },
    ]}
  />

  )
}

export default ChatHome
