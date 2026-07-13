import { render, screen } from '@testing-library/react';
import HowIWork from '@/components/landing/HowIWork';

describe('HowIWork', () => {
  it('renders the approach section with heading and copy', () => {
    render(<HowIWork />);
    expect(
      screen.getByRole('heading', { name: /start with the phone call, not the model/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/I start with the customer conversation/i)).toBeInTheDocument();
    expect(screen.getByText(/retrieval you can inspect/i)).toBeInTheDocument();
  });
});
