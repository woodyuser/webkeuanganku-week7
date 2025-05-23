import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LupaPasswordPage from './LupaPasswordPage';

describe('LupaPasswordForm', () => {
  it('renders the login form correctly', () => {
    render(<LupaPasswordPage />);

    // Check if the header text is rendered
    expect(screen.getByText('WELCOME TO KEUKU - KEUANGANKU')).toBeInTheDocument();

    // Check if the description text is rendered
    expect(screen.getByText('Catat dan Kelola Keuanganmu dengan Mudah')).toBeInTheDocument();

    // Check if the form instruction is rendered
    expect(screen.getByText('Masukkan Email dan Password Anda')).toBeInTheDocument();

    // Check if input fields are rendered
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password Baru')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Konfirmasi Password')).toBeInTheDocument();

    // Check if the sign-in button is rendered
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();

    // Check if the registration link is rendered
    expect(screen.getByText('Belum Punya Akun?')).toBeInTheDocument();
    expect(screen.getByText('Register Now')).toBeInTheDocument();

    // Check if the footer is rendered
    expect(screen.getByText('© 2025 Keuku by Indah. All rights reserved.')).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(<LupaPasswordPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password Baru');
    const confirmPasswordInput = screen.getByPlaceholderText('Konfirmasi Password');

    // Type in the email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    // Type in the password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');

    // Type in the confirm password input
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it('submits the form when clicking the sign-in button', () => {
    const mockSubmit = vi.fn(e => e.preventDefault());

    // Mock the form's onSubmit event
    const { container } = render(<LupaPasswordPage />);
    const form = container.querySelector('form');
    form.onsubmit = mockSubmit;

    // Click the sign-in button
    fireEvent.click(screen.getByText('SIGN IN'));

    // Check if the form was submitted
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
