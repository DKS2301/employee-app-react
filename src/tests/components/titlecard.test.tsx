import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TitleCard from '../../components/TitleCard';

describe('TitleCard Component', () => {
    it('match snapshot', () => {
        const { container: titleCard } = render(
            <TitleCard label="Title Card">
                <div>Hello</div>
            </TitleCard>,
        );
        expect(titleCard).toMatchSnapshot();
    });

    it('should render children and the label', () => {
        const { container: titleCard } = render(
            <TitleCard label="Title Card">
                <div>Hello</div>
            </TitleCard>,
        );
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Title Card')).toBeInTheDocument();
    });
});
