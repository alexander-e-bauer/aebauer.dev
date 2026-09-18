import { render, screen } from '@testing-library/react';
import Contact from '@/components/landing/Contact';

describe('Contact', () => {
  it('offers email, LinkedIn, GitHub, and the résumé', () => {
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

    const github = screen.getByRole('link', { name: /github/i });
    expect(github).toHaveAttribute('href', 'https://github.com/alexander-e-bauer');
    expect(github).toHaveTextContent('github.com/alexander-e-bauer');
  });
});
