import * as React from "react";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

const spinnerVariants = "w-16 h-16 rounded-full animate-spin";

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
  containerClassName?: string;
}

const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  (props, ref) => {
    const { className, containerClassName, ...rest } = props;
    return (
      <main
        className={cn(
          "flex items-center justify-center h-screen w-full",
          containerClassName
        )}
      >
        <LoaderIcon
          ref={ref}
          className={cn(spinnerVariants, className)}
          {...rest}
        />
      </main>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
