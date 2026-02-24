import { render, screen } from '@testing-library/react';
import { EmailLink } from './EmailLink';
import { expect, test, describe } from 'vitest';

describe('EmailLink Component', () => {
  test('renders with correct email text', () => {
    render(<EmailLink email="test@example.com" />);
    expect(screen.getByText('test@example.com')).toBeDefined();
  });

  test('has correct Gmail compose URL in href', () => {
    render(<EmailLink email="test@example.com" subject="Test Sub" body="Test Body" />);
    const link = screen.getByRole('link');
    const href = link.getAttribute('href');
    expect(href).toContain('https://mail.google.com/mail/');
    expect(href).toContain('to=test@example.com');
    expect(href).toContain('su=Test%20Sub');
    expect(href).toContain('body=Test%20Body');
  });

  test('has correct accessibility attributes', () => {
    render(<EmailLink />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('aria-label')).toBe('Email AquaShield — opens Gmail compose');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
