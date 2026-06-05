import React, { useState } from 'react'
import chat from '../assets/images/chat.svg'
import send from '../assets/images/send.svg'
import Button from './Button'
import Message from './Message'
import typing from '../assets/images/typing.svg'

function Chatbox() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
    {!isOpen?(
        <div className='chatbox'>
            <div className='chatbox-title' >
                <img src={chat} alt='chat'/>
                Help Desk   
            </div>
            <div className='chatbox-content'>
                {/* <div className='messages' > */}
                    <Message content='Lorem Ipsum dolor sit amet' id='sent'/>
                    <Message content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' id='received'/>
                    <Message content={<img src={typing} alt='typing'/>} id='received'/>
                    {/* <Message content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' id='received'/>
                    <Message content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' id='received'/> */}
    
                {/* </div> */}
                <div className="send-tab">
                    <input placeholder="Type your message here.." />
                    <Button className="send-btn" label={<img src={send} alt="send"/>}/>
                </div>
            </div>
        </div>
    ):(
        <div className='chatbox-title' onClick={()=>setIsOpen((prev)=> !prev)}>
            <img src={chat} alt='chat'/>
        </div>
    )
    }
    </>
  )
}

export default Chatbox