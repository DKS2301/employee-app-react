import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Form from '@/components/Form';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});
describe('Form Component', () => {
    it('match snapshot', () => {
        const { container: employeeForm } = render(<Form onSubmit={vi.fn()} />);
        expect(employeeForm).toMatchSnapshot();
    });

    it('should open upload dialog on clicking upload proof input and close on close button click', async () => {
        const { container: employeeForm } = render(<Form onSubmit={vi.fn()} />);

        const fileUploadInput = screen.getByTestId('file-upload');

        await userEvent.click(fileUploadInput);
        expect(screen.getByText('Upload Proof')).toBeInTheDocument();

        const closeFileUpload = screen.getByAltText('close');

        await userEvent.click(closeFileUpload);
        expect(screen.queryByText('Upload Proof')).not.toBeInTheDocument();
    });

    it('should display selected file on selection and clear on cancel', async () => {
        render(<Form onSubmit={vi.fn()} />);

        await userEvent.click(screen.getByTestId('file-upload'));

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

        const cancelSelection = screen.getByTestId('cancel-file');

        const file = new File(['dummy content'], 'proof.png', { type: 'image/png' });

        await fireEvent.change(fileInput, {
            target: {
                files: [file],
            },
        });

        expect(fileInput.files?.[0].name).toBe('proof.png');
        expect(screen.queryByTestId('file-name')).toHaveTextContent('proof.png');

        await userEvent.click(cancelSelection);
        expect(screen.getByText('Upload file')).toBeInTheDocument();
    });

    it('should navigate back on cancelling form', async () => {
        render(<Form onSubmit={vi.fn()} />);

        await userEvent.click(screen.getByTestId('form-cancel'));

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
