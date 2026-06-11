import React, { type ReactNode } from 'react';

interface buttonProps {
    typeName?: string;
    className: string;
    label: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    id?: string;
    testId?: string;
}

function Button({
    typeName = 'text',
    className,
    label,
    onClick = () => {},
    disabled = false,
    id = '',
    testId = '',
}: buttonProps) {
    return (
        <button
            itemType={typeName}
            className={className}
            onClick={onClick}
            disabled={disabled}
            id={id}
            data-testid={testId}
        >
            {label}
        </button>
    );
}

export default Button;
