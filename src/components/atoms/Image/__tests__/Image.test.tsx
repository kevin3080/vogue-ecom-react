
import { render, screen, fireEvent } from '@testing-library/react';
import { Image } from '../Image';

describe('Image', () => {
  test('renders with src and alt', () => {
    render(<Image src="/test.jpg" alt="Test image" />);
    const image = screen.getByAltText(/test image/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test.jpg');
  });

  test('uses fallback image on error', () => {
    render(<Image src="/broken.jpg" alt="Test" fallback="/fallback.jpg" />);
    const image = screen.getByAltText(/test/i);
    
    // Simulate image load error
    fireEvent.error(image);
    
    expect(image).toHaveAttribute('src', '/fallback.jpg');
  });

  test('applies aspect ratio classes', () => {
    render(<Image src="/test.jpg" alt="Test" aspectRatio="square" />);
    const container = screen.getByAltText(/test/i).parentElement;
    expect(container).toHaveClass('aspect-square');
  });

  test('shows loading state initially', () => {
    render(<Image src="/test.jpg" alt="Test" />);
    const loadingDiv = document.querySelector('.animate-pulse');
    expect(loadingDiv).toBeInTheDocument();
  });
});
