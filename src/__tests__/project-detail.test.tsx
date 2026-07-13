import { render, screen } from '@testing-library/react';
import ProjectDetail from '@/components/landing/ProjectDetail';
import type { ProjectCardData } from '@/components/landing/ProjectCard';

const base: ProjectCardData = {
  id: 'x',
  title: 'X Project',
  subtitle: 's',
  description: 'desc',
  stack: [],
  url: 'https://example.com',
};

describe('ProjectDetail drawer meta', () => {
  it('shows shipped date and a View code link when github is set', () => {
    render(
      <ProjectDetail
        project={{
          ...base,
          lastShipped: 'July 2026',
          github: 'https://github.com/alexander-e-bauer/r_machine_learning',
        }}
      />
    );
    expect(screen.getByText('Shipped · July 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view code/i })).toHaveAttribute(
      'href',
      'https://github.com/alexander-e-bauer/r_machine_learning'
    );
  });

  it('shows the code note when codeNote is set and no github link', () => {
    render(<ProjectDetail project={{ ...base, codeNote: 'Code available on request.' }} />);
    expect(screen.getByText('Code available on request.')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view code/i })).not.toBeInTheDocument();
  });
});
