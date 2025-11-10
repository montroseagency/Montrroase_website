'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import ApiService from '@/lib/api';
import { useRouter } from 'next/navigation';
import InteractiveGlowBackground from '@/components/interactive-glow-background';
import Navigation from '@/components/marketing/navigation';

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onToggle }) => {
  const { login, error: authError } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    verificationCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push('/dashboard');
      } else {
        setFormError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setFormError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email) {
      setFormError('Name and email are required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    setCurrentStep(2);
  };

  const handleSignupStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.password) {
      setFormError('Password is required');
      return;
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }

    // Send verification code
    setLoading(true);
    try {
      await ApiService.sendVerificationCode({
        email: formData.email,
        name: formData.name,
        purpose: 'registration'
      });

      setCurrentStep(3);
      setFormError('');
    } catch (err: any) {
      setFormError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setFormError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.verifyAndRegister({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: 'client',
        company: formData.company || undefined,
        verification_code: formData.verificationCode
      });

      if (response.token) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setFormError(err.message || 'Invalid or expired verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    setFormError('');

    try {
      await ApiService.resendVerificationCode({
        email: formData.email,
        name: formData.name,
        purpose: 'registration'
      });

      setResendCooldown(60); // 60 second cooldown

      // Show success message briefly
      setFormError('Code resent successfully!');
      setTimeout(() => {
        setFormError('');
      }, 3000);
    } catch (err: any) {
      setFormError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const displayError = formError || authError;

  // Login Form
  if (isLogin) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <InteractiveGlowBackground />

        <div className="relative" style={{ zIndex: 1 }}>
          <Navigation />

          <div className="min-h-screen flex items-center justify-center py-32 px-4">
            <div className="max-w-md w-full">
              <div
                className="rounded-2xl p-8 sm:p-10 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-3">Welcome back</h1>
                  <p className="text-gray-400 text-lg">Sign in to continue to Montrose</p>
                </div>

                {displayError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start backdrop-blur-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-red-300">{displayError}</span>
                  </div>
                )}

                {!showEmailLogin ? (
                  <div className="space-y-4">
                    {/* Social Login Buttons */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl group"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-200 border border-white/10 hover:border-white/20 group"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>Continue with GitHub</span>
                    </button>

                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-black hover:bg-gray-900 text-white rounded-lg font-medium transition-all duration-200 border border-white/10 hover:border-white/20 group"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      <span>Continue with Apple</span>
                    </button>

                    {/* Divider */}
                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-gray-400">or</span>
                      </div>
                    </div>

                    {/* Email Login Button */}
                    <button
                      type="button"
                      onClick={() => setShowEmailLogin(true)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Continue with Email</span>
                    </button>

                    <div className="mt-6 text-center">
                      <button
                        onClick={onToggle}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                        disabled={loading}
                      >
                        Don't have an account? <span className="font-semibold">Sign up</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <button
                      type="button"
                      onClick={() => setShowEmailLogin(false)}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to all sign in options</span>
                    </button>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-gray-500"
                        disabled={loading}
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-gray-500"
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-white/20 bg-white/5 text-white focus:ring-white/20" disabled={loading} />
                        <span className="ml-2 text-sm text-gray-400">Remember me</span>
                      </label>
                      <button type="button" className="text-sm text-gray-300 hover:text-white transition-colors" disabled={loading}>
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white hover:bg-gray-100 text-black py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {loading ? 'Signing in...' : 'Sign in with Email'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup Step 1: Basic Info
  if (currentStep === 1) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <InteractiveGlowBackground />

        <div className="relative" style={{ zIndex: 1 }}>
          <Navigation />

          <div className="min-h-screen flex items-center justify-center py-32 px-4">
            <div className="max-w-md w-full">
              <div
                className="rounded-2xl p-8 sm:p-10 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-3">Create your account</h1>
                  <p className="text-gray-400 text-lg">Get started with Montrose today</p>
                </div>

                {displayError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start backdrop-blur-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-red-300">{displayError}</span>
                  </div>
                )}

                {!showEmailSignup ? (
                  <div className="space-y-4">
                    {/* Social Signup Buttons */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl group"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Sign up with Google</span>
                    </button>

                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-200 border border-white/10 hover:border-white/20 group"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>Sign up with GitHub</span>
                    </button>

                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-black hover:bg-gray-900 text-white rounded-lg font-medium transition-all duration-200 border border-white/10 hover:border-white/20 group"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      <span>Sign up with Apple</span>
                    </button>

                    {/* Divider */}
                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-gray-400">or</span>
                      </div>
                    </div>

                    {/* Email Signup Button */}
                    <button
                      type="button"
                      onClick={() => setShowEmailSignup(true)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Sign up with Email</span>
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      By continuing, you agree to Montrose's{' '}
                      <a href="/terms" className="text-gray-400 hover:text-white underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-gray-400 hover:text-white underline">Privacy Policy</a>
                    </p>

                    <div className="mt-6 text-center">
                      <button
                        onClick={onToggle}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Already have an account? <span className="font-semibold">Sign in</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowEmailSignup(false)}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to all sign up options</span>
                    </button>

                    <form onSubmit={handleSignupStep1} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-gray-500"
                          autoFocus
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company <span className="text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your company name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-gray-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-white hover:bg-gray-100 text-black py-3 rounded-lg font-semibold transition-all flex items-center justify-center shadow-lg"
                      >
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup Step 2: Password
  if (currentStep === 2) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <InteractiveGlowBackground />

        <div className="relative" style={{ zIndex: 1 }}>
          <Navigation />

          <div className="min-h-screen flex items-center justify-center py-32 px-4">
            <div className="max-w-md w-full">
              <div
                className="rounded-2xl p-8 sm:p-10 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Step 2 of 3</span>
                    <span className="text-sm text-gray-400">Create Password</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-white via-gray-200 to-white h-2 rounded-full transition-all" style={{ width: '66.66%' }}></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Secure Your Account</h1>
                  <p className="text-gray-400">Create a strong password for your account</p>
                </div>

                {displayError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start backdrop-blur-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-red-300">{displayError}</span>
                  </div>
                )}

                <form onSubmit={handleSignupStep2} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-gray-500"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 space-y-2 border border-white/10">
                    <p className="text-sm font-medium text-gray-300 mb-2">Password must contain:</p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <CheckCircle className={`w-4 h-4 mr-2 ${formData.password.length >= 8 ? 'text-green-400' : 'text-gray-600'}`} />
                        <span className={formData.password.length >= 8 ? 'text-gray-300' : 'text-gray-500'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className={`w-4 h-4 mr-2 ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-400' : 'text-gray-600'}`} />
                        <span className={/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-gray-300' : 'text-gray-500'}>
                          Upper & lowercase letters
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className={`w-4 h-4 mr-2 ${/[0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-600'}`} />
                        <span className={/[0-9]/.test(formData.password) ? 'text-gray-300' : 'text-gray-500'}>
                          At least one number
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/5 transition-all flex items-center justify-center"
                      disabled={loading}
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold border border-white/30 hover:border-white/60 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending Code...' : 'Continue'}
                      {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Signup Step 3: Email Verification
  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveGlowBackground />

      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />

        <div className="min-h-screen flex items-center justify-center py-32 px-4">
          <div className="max-w-md w-full">
            <div
              className="rounded-2xl p-8 sm:p-10 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Step 3 of 3</span>
                  <span className="text-sm text-gray-400">Verify Email</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-white via-gray-200 to-white h-2 rounded-full transition-all" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Check Your Email</h1>
                <p className="text-gray-400">
                  We sent a 6-digit code to <br />
                  <span className="font-semibold text-white">{formData.email}</span>
                </p>
              </div>

              {displayError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start backdrop-blur-xl">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-red-300">{displayError}</span>
                </div>
              )}

              <form onSubmit={handleSignupStep3} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setFormData({ ...formData, verificationCode: value });
                    }}
                    placeholder="000000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-center text-2xl tracking-widest font-semibold text-white placeholder:text-gray-600"
                    maxLength={6}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Enter the 6-digit code from your email
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/5 transition-all flex items-center justify-center"
                    disabled={loading}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || formData.verificationCode.length !== 6}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold border border-white/30 hover:border-white/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify & Create Account'}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || loading}
                  className="text-sm text-gray-300 hover:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Didn't receive the code? Resend"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
