import './ErrorPage.css';

import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();

    let title = 'Oops';
    let message = 'An unexpected error occurred.';

    if (isRouteErrorResponse(error)) {
        title = `${error.status} Error`;
        message = error.statusText;
    } else if (error instanceof Error) {
        message = error.message;
    }

    return (
        <main className="error-page">
            <div className="error-page-content">
                <h1>{title}</h1>

                <p>{message}</p>

                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </main>
    );
}

export default ErrorPage;
