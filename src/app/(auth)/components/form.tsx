"use client";

import { Mail, EyeOff, Eye, ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { AuthSchemaType, useAuthForm } from "@/zod/auth-form/auth-form";

type FormProps = {
  onSubmit: (data: AuthSchemaType) => void;
  submitButtonMessage: string
};

export default function Form({ onSubmit, submitButtonMessage }: FormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const form = useAuthForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail
                className={`h-5 w-5 transition-colors duration-200 ${
                  focusedField === "email" ? "text-gray-900" : "text-gray-400"
                }`}
              />
            </div>
            <input
              {...form.register("email")}
              id="email"
              name="email"
              type="text"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <p className="text-red-400">{form.formState.errors.email?.message}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock
                className={`h-5 w-5 transition-colors duration-200 ${
                  focusedField === "password"
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              />
            </div>
            <input
              {...form.register("password")}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-red-400">
            {form.formState.errors.password?.message}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember for 30 days
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="group relative w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <span className="flex items-center justify-center">
            {submitButtonMessage}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </button>
      </form>
    </FormProvider>
  );
}
