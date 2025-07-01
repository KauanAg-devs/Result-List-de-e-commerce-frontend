"use client";

import Form from "@/app/(auth)/components/form";
import SocialSignin from "@/app/(auth)/components/social-signin";
import Footer from "@/app/(auth)/components/footer";
import { Main } from "@/app/(auth)/components/main";
import Header from "@/app/(auth)/components/header";
import { AuthSchemaType } from "@/zod/auth-form/auth-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (data: AuthSchemaType) => {
    if (!data.email.credentialPrivateEmail || !data.password) {
      setErrorMessage('Email and password are required');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/signup`,
        data,
        {
          withCredentials: true,
        }
      );
      
      setUserEmail(data.email.credentialPrivateEmail);
      setShowVerification(true);
    } catch (e: any) {
      setErrorMessage(e.response?.data?.message || 'An error occurred during signup');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode) {
      setVerificationCodeError("Verification code is required");
      return;
    }

    setIsVerifying(true);
    setVerificationCodeError('');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/verify-email`,
        { verificationCode },
        {
          withCredentials: true,
        }
      );

      router.push("/");
    } catch (e: any) {
      setVerificationCodeError(e.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!userEmail) return;

    setIsResending(true);
    setVerificationCodeError('');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/resend-email-verification`,
        { email: userEmail },
        {
          withCredentials: true,
        }
      );

      setVerificationCodeError('');
      setVerificationCodeError('New verification code sent to your email');
      setTimeout(() => setVerificationCodeError(''), 3000);
    } catch (e: any) {
      setVerificationCodeError(e.response?.data?.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToSignup = () => {
    setShowVerification(false);
    setVerificationCode('');
    setVerificationCodeError('');
    setUserEmail('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {!showVerification ? (
          <>
            <Header
              idea="Sign up to your account"
              message="Welcome! Please enter your details."
            />
            <Main>
              <Form 
                submitButtonMessage={isSubmitting ? "Creating account..." : "Sign up"} 
                onSubmit={handleSubmit}
              />
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}
              <SocialSignin />
            </Main>
            <Footer
              redirectTo="/signin"
              accountQuestion="Already have an account?"
              idea="Sign in"
            />
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-gray-600 mb-2">
                We sent a verification code to
              </p>
              <p className="text-sm font-medium text-gray-900 mb-4">
                {userEmail}
              </p>
              <p className="text-sm text-gray-500">
                Enter the 6-digit code below to verify your account.
              </p>
            </div>

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setVerificationCode(value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 text-center text-lg font-mono tracking-widest placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  maxLength={6}
                />
              </div>

              {verificationCodeError && (
                <div className={`p-3 rounded-md ${
                  verificationCodeError.includes('sent') 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${
                    verificationCodeError.includes('sent') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {verificationCodeError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || verificationCode.length !== 6}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? "Verifying..." : "Verify Account"}
              </button>

              <div className="text-center space-y-4">
                <div className="text-sm text-gray-600">
                  Didn't receive the code?
                </div>
                
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleBackToSignup}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    ← Back to sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}