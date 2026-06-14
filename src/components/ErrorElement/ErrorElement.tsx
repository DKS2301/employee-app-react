import './ErrorElement.css';

import Button from '@components/Button';
interface ErrorStateProps {
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
}

function ErrorState({
    title,
    message,
    actionLabel,
    onAction,
    secondaryActionLabel,
    onSecondaryAction,
}: ErrorStateProps) {
    return (
        <div className="page-state error-state">
            <h3>{title}</h3>

            <p>{message}</p>

            {(actionLabel || secondaryActionLabel) && (
                <div className="page-state-actions">
                    {actionLabel && onAction && (
                        <Button
                            typeName="button"
                            className="primary"
                            label={actionLabel}
                            onClick={onAction}
                        />
                    )}

                    {secondaryActionLabel && onSecondaryAction && (
                        <Button
                            typeName="button"
                            className="outline"
                            label={secondaryActionLabel}
                            onClick={onSecondaryAction}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ErrorState;
