import React, { useCallback, useRef, useState } from 'react';

import { streamChatResponse } from '@/components/Chatbot/utils/streamChatResponse';

interface chatMessage {
    role: string;
    msg: string;
}

export default function useSSEChat() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState<chatMessage[]>([]);
    const abortRef = useRef<AbortController | null>(null);

    const sendMessage = useCallback(async (prompt: string) => {
        abortRef.current?.abort();
        abortRef.current = new AbortController();
        setErrorMessage('');
        setIsStreaming(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', msg: prompt },
            { role: 'bot', msg: '' },
        ]);

        try {
            await streamChatResponse(
                prompt,
                (accumulated) => {
                    setMessages((prev) => {
                        const updatedMsgs = [...prev];
                        updatedMsgs[updatedMsgs.length - 1] = { role: 'bot', msg: accumulated };
                        return updatedMsgs;
                    });
                },
                abortRef.current.signal,
            );
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                setErrorMessage((error as Error).message);
            }
        } finally {
            setIsStreaming(false);
        }
    }, []);

    return { messages, isStreaming, errorMessage, sendMessage };
}
