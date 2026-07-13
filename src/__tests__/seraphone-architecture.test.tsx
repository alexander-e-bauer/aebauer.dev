import { render, screen } from '@testing-library/react';
import SeraphoneArchitecture from '@/components/landing/SeraphoneArchitecture';
import ProjectDetail from '@/components/landing/ProjectDetail';

describe('SeraphoneArchitecture', () => {
  it('renders the call-flow diagram with key services and caption', () => {
    render(<SeraphoneArchitecture />);
    expect(screen.getByText('OpenAI Realtime API')).toBeInTheDocument();
    expect(screen.getByText('MCP tool server')).toBeInTheDocument();
    expect(screen.getByText('Caller knowledge graph')).toBeInTheDocument();
    expect(screen.getByText(/demo lines above run this exact path/i)).toBeInTheDocument();
  });

  it('renders inside the drawer when project.diagram is set', () => {
    render(
      <ProjectDetail
        project={{
          id: 'x',
          title: 'X',
          subtitle: 's',
          description: 'd',
          stack: [],
          url: 'https://example.com',
          diagram: SeraphoneArchitecture,
        }}
      />
    );
    expect(screen.getByText('OpenAI Realtime API')).toBeInTheDocument();
  });
});
