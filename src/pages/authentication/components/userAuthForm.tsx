"use client";

import * as React from "react";

import { cn } from "~/lib/utils";
import { Icons } from "~/components/ui/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  useEffect(() => {
    if (sessionData) {
      void router.push("/generate/page");
    }
  }, [sessionData, router]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={
          sessionData ? () => void signOut() : () => void handleGoogleLogin()
        }
      >
        <Icons.google className="mr-2 h-4 w-4" />{" "}
        {sessionData ? " Sign out" : " Google"}
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={
          sessionData ? () => void signOut() : () => void handleGithubLogin()
        }
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />{" "}
        {sessionData ? " Sign out" : " Github"}
      </Button>
    </div>
  );
}
