import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/landing/ProjectCard';

const base = {
  id: 'x',
  title: 'X Project',
  subtitle: 'AI — Live Demo',
  description: 'desc',
  stack: ['Python'],
  url: 'https://example.com',
  isOpen: false,
  onToggle: () => {},
};

describe('ProjectCard skim layer', () => {
  it('renders tagline, live pulse, and demo hint when provided', () => {
    render(
      <ProjectCard
        {...base}
        live
        tagline="alpha · beta · gamma"
        demoNumbers={[{ label: 'Test line', number: '+1-555-000-1111' }]}
        demoHint="Try: say hello — ninety seconds."
      />
    );
    expect(screen.getByText('alpha · beta · gamma')).toBeInTheDocument();
    expect(screen.getByTestId('live-pulse')).toBeInTheDocument();
    expect(screen.getByText(/Try: say hello/i)).toBeInTheDocument();
  });

  it('renders none of them when the fields are absent', () => {
    render(<ProjectCard {...base} />);
    expect(screen.queryByTestId('live-pulse')).not.toBeInTheDocument();
    expect(screen.queryByText(/Try:/)).not.toBeInTheDocument();
    expect(screen.queryByText('alpha · beta · gamma')).not.toBeInTheDocument();
  });
});
