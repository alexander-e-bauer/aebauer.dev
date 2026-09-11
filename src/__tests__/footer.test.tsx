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

  it('links email and LinkedIn but not the GitHub profile', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
  });
});
