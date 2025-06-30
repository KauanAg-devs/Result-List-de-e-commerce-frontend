"use client";

import Form from "@/app/(auth)/components/form";
import SocialSignin from "@/app/(auth)/components/social-signin";
import Footer from "@/app/(auth)/components/footer";
import { Main } from "@/app/(auth)/components/main";
import Header from "@/app/(auth)/components/header";
import { AuthSchemaType } from "@/zod/auth-form/auth-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const handleSubmit = async (data: AuthSchemaType) => {
    const formatedData = {
      credentialPrivateEmail: data.email.credentialPrivateEmail.toLowerCase(),
      password: data.password,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/signin`,
        formatedData,
        { withCredentials: true }
      );
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Header
          idea="Sign in to your account"
          message="Welcome back! Please enter your details."
        />
        <Main>
          <Form submitButtonMessage="Sign in" onSubmit={handleSubmit} />
          <SocialSignin />
        </Main>
        <Footer
          redirectTo="/signup"
          accountQuestion="Don't have an account?"
          idea="Sign up for free"
        />
      </div>
    </div>
  );
}
