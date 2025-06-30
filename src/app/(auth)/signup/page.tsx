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
  const [log, setLog] = useState("");

  const handleSubmit = async (data: AuthSchemaType) => {
    setLog("Início do handleSubmit");

    if (!data.email.credentialPrivateEmail || !data.password) {
      setLog("Email ou senha vazios");
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/signup`,
        data,
        {
          withCredentials: true,
        }
      );
      setLog("Signup feito, redirecionando...");
      router.push("/");
    } catch (e: any) {
      setLog("Erro: " + (e.message || "erro desconhecido"));
    }
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
        {log}
      </div>
    </div>
  );
}
