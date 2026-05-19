"use client";

import { useState } from "react";
import { Input, Button, Card, Link } from "@heroui/react";
import NextLink from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    // TODO: Integrate Better Auth signUp
    console.log("Sign Up with", { name, email, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl">
        <div className="flex flex-col gap-1 items-center pt-8 pb-4">
          <h2 className="text-2xl font-bold text-center">Create an Account</h2>
          <p className="text-sm text-default-500">Join Wanderlust to start your journey</p>
        </div>
        <div className="px-8 pb-8">
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <Input
              required
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              variant="bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              placeholder="Create a password"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              variant="bordered"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button 
              color="primary" 
              type="submit" 
              className="w-full mt-4" 
              isLoading={isLoading}
              size="lg"
            >
              Sign Up
            </Button>
          </form>

          <div className="flex items-center gap-4 py-6">
            <hr className="flex-1 border-gray-200 dark:border-gray-800" />
            <p className="text-tiny text-default-500">OR</p>
            <hr className="flex-1 border-gray-200 dark:border-gray-800" />
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link as={NextLink} href="/login" color="primary" className="font-semibold">
              Log in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
