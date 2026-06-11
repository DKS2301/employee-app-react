interface FallbackProps {
    message?: string;
}

export default function Fallback({ message = 'Loading...' }: FallbackProps) {
    return (
        <div className="loading-state">
            <div className="spinner" />
            <span>{message}</span>
        </div>
    );
}
