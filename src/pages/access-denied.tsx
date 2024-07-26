import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background space-y-6">
      <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
        Access Denied
      </h2>
      <Button asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
