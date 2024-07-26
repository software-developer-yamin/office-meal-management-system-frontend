import { useState } from "react";
import LoginForm from "@/components/form/login-form";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SignIn() {
  const [banError, setBanError] = useState<string | null>(null);

  const handleLoginAttempt = (error: string | null) => {
    setBanError(error);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              to="/sign-up"
              className="font-medium text-primary hover:text-primary/80"
            >
              register for a new account
            </Link>
          </p>
        </div>

        <LoginForm onLoginAttempt={handleLoginAttempt} />

        <Alert variant="default" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Demo Credentials</AlertTitle>
          <AlertDescription>
            <p>Email: user@example.com</p>
            <p>Password: password123</p>
          </AlertDescription>
        </Alert>

        {banError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>{banError}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
