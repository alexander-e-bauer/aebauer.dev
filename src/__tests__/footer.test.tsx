import { render, screen } from '@testing-library/react';
import Footer from '@/components/landing/Footer';

describe('Footer', () => {
  it('shows the currently-building line and open-source link', () => {
    render(<Footer />);
    expect(screen.getByText(/currently building/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /this site is open source/i })).toHaveAttribute(
      'href',
      'https://github.com/alexander-e-bauer/aebauer.dev'
    );
  });
});
