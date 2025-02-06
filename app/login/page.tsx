"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  const [isWomenLogin, setIsWomenLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    // For now, we'll just redirect to the appropriate dashboard
    if (isWomenLogin) {
      router.push("/women/dashboard");
    } else {
      router.push("/organization/dashboard");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center gradient-text">
            {isWomenLogin ? "Women Login" : "Organization Login"}
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {isWomenLogin ? (
            <>
              <Button variant="link" asChild>
                <Link href="/register?role=woman">Register as Woman</Link>
              </Button>
              <Button variant="outline" onClick={() => setIsWomenLogin(false)}>
                Login as Organization
              </Button>
            </>
          ) : (
            <>
              <Button variant="link" asChild>
                <Link href="/register?role=organization">
                  Register as Organization
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setIsWomenLogin(true)}>
                Login as Woman
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
