import { configureStore } from '@reduxjs/toolkit/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Login from '../../pages/Login/Login';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock the store
const mockStore = configureStore({
    reducer: {
        employee: (state = { employees: [] }) => state,
        department: (state = { departments: [] }) => state,
        employeeApi: (state = {}) => state,
    },
});

// Mock the login mutation
const mockLoginMutation = vi.fn().mockResolvedValue({
    access_token: 'access',
    refresh_token: 'refresh',
});

let mockIsLoading = false;

vi.mock('../../api-services/auth/login.api', () => ({
    useLoginMutation: () => [
        () => ({
            unwrap: () => mockLoginMutation(),
        }),
        { isLoading: mockIsLoading },
    ],
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('Login Page', () => {
    it('match snapshot', () => {
        const { container: loginPage } = render(
            <Provider store={mockStore}>
                <Login />
            </Provider>,
        );
        expect(loginPage).toMatchSnapshot();
    });

    it('should show validation errors', async () => {
        render(
            <Provider store={mockStore}>
                <Login />
            </Provider>,
        );

        const usernameInput = screen.getByLabelText(/username/i);

        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(usernameInput, 'abcdef');

        expect(await screen.findByText('Email must include @')).toBeInTheDocument();

        await userEvent.clear(usernameInput);

        await userEvent.type(usernameInput, 'abc@example.com');

        expect(screen.queryByText('Email must include @')).not.toBeInTheDocument();

        await userEvent.type(passwordInput, '123456');

        expect(
            await screen.queryByText('Password must contain at least 8 chars'),
        ).toBeInTheDocument();

        await userEvent.type(passwordInput, '12345678');

        expect(
            await screen.queryByText('Password must contain at least 8 chars'),
        ).not.toBeInTheDocument();
    });

    it('should log in successfully', async () => {
        const loginPage = render(
            <Provider store={mockStore}>
                <Login />
            </Provider>,
        );
        const usernameInput = screen.getByLabelText(/username/i);

        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(usernameInput, 'abc@example.com');
        await userEvent.type(passwordInput, '12345678');

        const loginButton = loginPage.getByRole('button');
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockLoginMutation).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith('/employee');
        });
    });

    it('should fail gracefully', async () => {
        const loginPage = render(
            <Provider store={mockStore}>
                <Login />
            </Provider>,
        );

        const errorMessage = 'Invalid credentials';
        mockLoginMutation.mockRejectedValueOnce({
            data: { detail: errorMessage },
        });

        const loginButton = loginPage.getByRole('button');
        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            expect(mockNavigate).not.toHaveBeenCalledWith('/employee');
        });
    });

    it('should prevent double clicks and show loading', async () => {
        mockIsLoading = true;
        const loginPage = render(
            <Provider store={mockStore}>
                <Login />
            </Provider>,
        );
        const usernameInput = screen.getByLabelText(/username/i);

        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(usernameInput, 'abc@example.com');
        await userEvent.type(passwordInput, '12345678');

        const loginButton = loginPage.getByRole('button');
        fireEvent.click(loginButton);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByText('Logging in..'));
    });
});
