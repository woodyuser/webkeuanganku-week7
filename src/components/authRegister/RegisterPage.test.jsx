import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('renders the register form with all required elements', () => {
    render(<RegisterForm />);

    // Check for header elements
    expect(screen.getByText('WELCOME TO KEUKU - KEUANGANKU')).toBeInTheDocument();
    expect(screen.getByText('Catat dan Kelola Keuanganmu dengan Mudah')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check for form elements
    expect(screen.getByText('Masukkan Email dan Password Anda')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Konfirmasi Password')).toBeInTheDocument();
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();

    // Check for links
    expect(screen.getByText('Lupa Password')).toBeInTheDocument();
    expect(screen.getByText('Belum Punya Akun?')).toBeInTheDocument();
    expect(screen.getByText('Register Now')).toBeInTheDocument();

    // Check for footer
    expect(screen.getByText('© 2025 Keuku by Indah. All rights reserved.')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    fireEvent.blur(emailInput);

    // Check for validation error
    expect(await screen.findByText('Email must contain @')).toBeInTheDocument();

    // Fix the email and check that error disappears
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.blur(emailInput);

    expect(screen.queryByText('Email must contain @')).not.toBeInTheDocument();
  });

  it('validates password confirmation', async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Konfirmasi Password');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
    fireEvent.blur(confirmPasswordInput);

    // Check for validation error
    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();

    // Fix the confirmation password and check that error disappears
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
  });

  it('submits the form with valid data', () => {
    // Mock console.log to check if form submission works
    console.log = vi.fn();

    render(<RegisterForm />);

    // Fill in valid form data
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Konfirmasi Password'), {
      target: { value: 'password123' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('SIGN IN'));

    // Check if form submission function was called
    expect(console.log).toHaveBeenCalledWith(
      'Form submitted successfully',
      { email: 'test@example.com', password: 'password123' }
    );
  });
});
