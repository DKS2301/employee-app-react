import { render, screen } from '@testing-library/react';
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

    it('should render with default prop values', () => {
        render(<Button className="button-test" label="button-label" />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('class', 'button-test');
    });
});
