"use client";

import {useState} from "react";

type R = {
  status: number;
  body: {
    message: string;
  };
};

type Props = {
  // eslint-disable-next-line unused-imports/no-unused-vars
  onSubmit: (formdata: FormData) => Promise<R>;
};

export default function LoginForm({onSubmit}: Props) {
  let [data, setData] = useState<R | null>(null);
  return (
    <form
      action={async (e) => {
        let res = await onSubmit(e);
        setData(res);
      }}
      className="mx-auto max-w-sm"
    >
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="email" className="flex flex-col gap-1">
          <span>email</span>
          <input type="email" name="email" id="email" required />
        </label>
        <label htmlFor="password" className="flex flex-col gap-2">
          <span>password</span>
          <input type="password" name="password" id="password" required />
        </label>

        <button type="submit" className="w-24 border px-2 py-1">
          Login
        </button>
      </fieldset>
    </form>
  );
}
