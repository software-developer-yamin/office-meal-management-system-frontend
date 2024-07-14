import LoginForm from "@/components/form/login-form";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link
              to={"/sign-up"}
              className="font-medium text-primary hover:text-primary/80"
            >
              register for a new account
            </Link>
          </p>
        </div>
        <LoginForm/>
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* <CircleIcon className="h-5 w-5 text-red-400" /> */}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                You are not allowed to log in
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  You have been banned from this application. If you believe
                  this is an error, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
