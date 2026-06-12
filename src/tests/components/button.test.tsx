import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '@/components/Button';

describe('Input Component', () => {
    it('match snapshot', () => {
        const { container } = render(
            <Button
                itemType="submit"
                className="test-class"
                onClick={vi.fn}
                disabled={true}
                id="test-button"
            />,
        );
        expect(container).toMatchSnapshot();
    });

    it('should render with default prop values', async () => {
        render(<Button className="button-test" label="button-label" />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('class', 'button-test');

        await expect(userEvent.click(button)).resolves.not.toThrow();
    });

    it('should trigger onclick handlers on click', async () => {
        const handleClick = vi.fn();
        render(<Button className="button-test" label="button-label" onClick={handleClick} />);

        const button = screen.getByRole('button');

        expect(screen.getByText('button-label')).toBeInTheDocument();
        await userEvent.click(button);

        expect(handleClick).toHaveBeenCalled();
    });
});
