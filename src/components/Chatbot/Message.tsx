import typing from '@images/typing.svg';
interface messageProps {
    content: string;
    id: string;
}

function Message({ content, id }: messageProps) {
    return (
        <>
            <div className="message-sent" id={id}>
                {content === '' ? <img src={typing} alt="typing" /> : content}
            </div>
        </>
    );
}

export default Message;
