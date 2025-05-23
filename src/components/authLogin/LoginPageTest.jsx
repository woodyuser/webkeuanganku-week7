import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import LoginForm from './LoginForm';

// Mock console.log to test form submission
console.log = vi.fn();

describe('LoginPage', () => {
  it('renders the login page correctly', () => {
    render(<LoginPage />);

    // Check if header elements are rendered
    expect(screen.getByText('WELCOME TO KEUKU - KEUANGANKU')).toBeInTheDocument();
    expect(screen.getByText('Catat dan Kelola Keuanganmu dengan Mudah')).toBeInTheDocument();

    // Check if form elements are rendered
    expect(screen.getByText('Masukkan Email dan Password Anda')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();

    // Check if links are rendered
    expect(screen.getByText('Lupa Password')).toBeInTheDocument();
    expect(screen.getByText('Register Now')).toBeInTheDocument();

    // Check if footer is rendered
    expect(screen.getByText('© 2025 Keuku by Indah. All rights reserved.')).toBeInTheDocument();
  });
});

describe('LoginForm', () => {
  it('handles form input and submission correctly', () => {
    render(<LoginForm />);

    // Get form elements
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('SIGN IN');

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if console.log was called with the correct data
    expect(console.log).toHaveBeenCalledWith('Login attempt with:', {
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
