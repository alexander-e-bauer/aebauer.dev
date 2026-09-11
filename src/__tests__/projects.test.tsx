import { render, screen } from '@testing-library/react';
import Projects from '@/components/landing/Projects';
import About from '@/components/landing/About';

describe('Projects section', () => {
  it('names the three systems as they ship today', () => {
    render(<Projects />);
    expect(screen.getByRole('heading', { name: 'Seraphone' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Atlas in Relief' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'RAPTOR Code Knowledge Graph' })).toBeInTheDocument();
  });

  it('describes Seraphone by its controls rather than a compliance claim', () => {
    render(<Projects />);
    expect(screen.queryByText(/hipaa/i)).not.toBeInTheDocument();
  });
});

describe('About section', () => {
  it('uses the current atlas name and makes no compliance claim', () => {
    render(<About />);
    expect(screen.getByText('Atlas in Relief')).toBeInTheDocument();
    expect(screen.queryByText(/hipaa/i)).not.toBeInTheDocument();
  });
});

describe('Atlas corpus count', () => {
  it('matches between the hero and the card so the two never drift apart', async () => {
    const { default: Hero } = await import('@/components/landing/Hero');
    render(<Hero />);
    render(<Projects />);
    expect(screen.getByText(/26,988-paper research atlas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/26,988 papers/).length).toBeGreaterThan(0);
  });
});
