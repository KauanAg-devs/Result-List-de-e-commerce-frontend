"use client";

import Form from "@/app/(auth)/components/form";
import SocialSignin from "@/app/(auth)/components/social-signin";
import Footer from "@/app/(auth)/components/footer";
import { Main } from "@/app/(auth)/components/main";
import Header from "@/app/(auth)/components/header";
import { AuthSchemaType } from "@/zod/auth-form/auth-form";

export default function SignUp() {
  const handleSubmit = (data: AuthSchemaType) => {
    if (!data.email || !data.password) {
      alert("Please fill in both email and password.");
      return;
    }

    console.log("Submitting:", data);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Header
          idea="Sign up to your account"
          message="Welcome! Please enter your details."
        />
        <Main>
          <Form submitButtonMessage="Sign up" onSubmit={handleSubmit} />
          <SocialSignin />
        </Main>
        <Footer
          redirectTo="/signin"
          accountQuestion="Already have an account?"
          idea="Sign in"
        />
      </div>
    </div>
  );
}
