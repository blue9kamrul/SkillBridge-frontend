import * as React from "react";
import { cn } from "@/lib/utils";

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-2", className)}
      {...props}
    />
  );
});
Field.displayName = "Field";

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("space-y-4", className)}
      {...props}
    />
  );
});
FieldGroup.displayName = "FieldGroup";

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { errors?: any }
>(({ className, errors, ...props }, ref) => {
  if (!errors || errors.length === 0) return null;

  const errorMessage = typeof errors[0] === 'string' ? errors[0] : String(errors[0]);

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {errorMessage}
    </p>
  );
});
FieldError.displayName = "FieldError";

export { Field, FieldGroup, FieldLabel, FieldError };
