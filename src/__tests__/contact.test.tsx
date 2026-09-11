import { render, screen } from '@testing-library/react';
import Contact from '@/components/landing/Contact';

describe('Contact', () => {
  it('offers email, LinkedIn, and the résumé — no GitHub profile card', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      'mailto:alex@aebauer.dev'
    );

    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/alexander-e-bauer');
    expect(linkedin).toHaveTextContent('linkedin.com/in/alexander-e-bauer');

    const resume = screen.getByRole('link', { name: /r[ée]sum[ée]/i });
    expect(resume).toHaveAttribute('href', '/alex_bauer_resume.pdf');
    expect(resume).toHaveAttribute('download');

    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
  });
});
