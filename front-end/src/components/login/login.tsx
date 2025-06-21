"use client";

import Header from "@/components/login/header";
import Form from "./form";
import SocialLogin from "./social-login";
import Footer from "./footer";
import { Main } from "./main";

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Header />
        <Main>
          <Form />
          <SocialLogin />
        </Main>
        <Footer />
      </div>
    </div>
  );
}
