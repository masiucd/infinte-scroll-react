import {Form} from "@remix-run/react";
import {type PropsWithChildren} from "react";

import {cn} from "~/lib/styles";
import Button from "~/ui/button";

type Props = {
  title: string;
  className?: string;
  action: string;
};

export const AuthForm = ({
  title,
  className,
  children,
  action,
}: PropsWithChildren<Props>) => {
  return (
    <fieldset
      className={cn(
        "mx-auto my-8 flex w-full max-w-md flex-col items-center justify-center rounded-md border border-gray-300 p-4 shadow-md",
        className
      )}
    >
      <legend className="px-1 text-xl tracking-tight">{title}</legend>
      <Form
        method="post"
        action={action}
        className="flex w-full flex-col gap-2"
      >
        {children}
      </Form>
    </fieldset>
  );
};

function FormGroup({
  label,
  children,
  className,
}: PropsWithChildren<{label: string; className?: string}>) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={label} className="capitalize">
        {label}
      </label>
      {children}
    </div>
  );
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

function Input({label, className, ...props}: PropsWithChildren<InputProps>) {
  return (
    <input
      {...props}
      id={label}
      name={label}
      className={cn("rounded-sm text-gray-950", className)}
      required
    />
  );
}

function SubmitButton({children}: PropsWithChildren<{}>) {
  return (
    <Button variant="primary" type="submit">
      {children}
    </Button>
  );
}

AuthForm.Input = Input;
AuthForm.FormGroup = FormGroup;
AuthForm.SubmitButton = SubmitButton;
