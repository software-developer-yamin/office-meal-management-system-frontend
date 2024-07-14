import RegisterForm from "@/components/form/register-form";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              to="/sign-in"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in with your existing account
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
