import './Chatbot.css';

import Button from '@components/Button';
import chat from '@images/chat.svg';
import close from '@images/close.svg';
import send from '@images/send.svg';
import React, { useEffect, useRef, useState } from 'react';

import useSSEChat from '@/hooks/useSSEChat';

import Message from './Message';

function Chatbox() {
    const [isOpen, setIsOpen] = useState(false);
    const chatboxRef = useRef<HTMLDivElement>(null);
    const [typedMessage, setTypedMessage] = useState('');
    const { messages, isStreaming, errorMessage, sendMessage, abortRef } = useSSEChat();

    const handleMessageSend = async () => {
        if (typedMessage.trim() === '' && !isStreaming) {
            return;
        }
        setTypedMessage('');
        await sendMessage(typedMessage);
    };

    const handleStopStreaming = () => {
        abortRef.current?.abort();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!isStreaming) {
            handleMessageSend();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatboxRef.current && !chatboxRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={chatboxRef}>
            {isOpen ? (
                <>
                    <div className="chatbox">
                        <div className="chatbox-title">
                            <img src={chat} alt="chat" />
                            Help Desk
                        </div>
                        <div className="chatbox-content">
                            {messages.map((message, idx) => (
                                <Message
                                    content={message.msg}
                                    id={message.role === 'user' ? 'sent' : 'received'}
                                    key={`msg-${idx}`}
                                />
                            ))}
                            {/* </div> */}
                            <form className="send-tab" onSubmit={(e) => handleFormSubmit}>
                                <input
                                    placeholder={
                                        isStreaming
                                            ? 'Generating response...'
                                            : 'Type your message here..'
                                    }
                                    value={typedMessage}
                                    onChange={(e) => setTypedMessage(e.target.value)}
                                />
                                <Button
                                    className="send-btn"
                                    label={
                                        !isStreaming ? (
                                            <img
                                                src={send}
                                                alt="send"
                                                onClick={handleMessageSend}
                                            />
                                        ) : (
                                            <img
                                                src={close}
                                                alt="stop"
                                                onClick={handleStopStreaming}
                                            />
                                        )
                                    }
                                />
                            </form>
                        </div>
                        {<p className="error">{errorMessage}</p>}
                    </div>
                </>
            ) : (
                <div className="chatbox closed" onClick={() => setIsOpen((prev) => !prev)}>
                    <img src={chat} alt="chat" />
                </div>
            )}
        </div>
    );
}

export default Chatbox;
