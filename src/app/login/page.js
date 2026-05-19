"use client";

import { useState } from "react";
import { Input, Button, Card, Link } from "@heroui/react";
import NextLink from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Integrate Better Auth signIn
    console.log("Login with", { email, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <div className="flex flex-col gap-1 items-center pt-8 pb-4">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-sm text-default-500">Log in to your Wanderlust account</p>
        </div>
        <div className="px-8 pb-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              required
              label="Email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <div className="flex justify-end">
              <Link href="#" size="sm" color="primary">
                Forgot password?
              </Link>
            </div>

            <Button 
              color="primary" 
              type="submit" 
              className="w-full mt-2" 
              isLoading={isLoading}
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center gap-4 py-6">
            <hr className="flex-1 border-gray-200 dark:border-gray-800" />
            <p className="text-tiny text-default-500">OR</p>
            <hr className="flex-1 border-gray-200 dark:border-gray-800" />
          </div>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link as={NextLink} href="/signup" color="primary" className="font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
