import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { TitleWithWrapper } from "~/components/page-title";
import { createCookie, redirect } from "@remix-run/node";
import { themeStorage } from "~/utils/theme.server";

export const meta: MetaFunction = () => [
  { title: "My working journal" },
  {
    name: "description",
    content: "Here where I journal my progress as a developer",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  let cookieHeader = request.headers.get("Cookie");
  let themeCookie = await themeStorage.parse(cookieHeader);
  console.log("themeCookie from loader", themeCookie);
  // if (!themeCookie.theme) {
  //   themeCookie.theme = "dark";
  //   return redirect("/", {
  //     headers: {
  //       "Set-Cookie": await themeStorage.serialize(themeCookie),
  //     },
  //   });
  // }
  // console.log("themeCookie", themeCookie);
  if (themeCookie) {
    return themeCookie as { theme: "dark" | "light" };
  }
  return { theme: null };
}

export async function action({ request }: ActionFunctionArgs) {
  let cookieHeader = request.headers.get("Cookie");
  let cookie = (await themeStorage.parse(cookieHeader)) || {};

  if (!cookie.theme) {
    cookie.theme = "dark";
    return redirect("/", {
      headers: {
        "Set-Cookie": await themeStorage.serialize(cookie),
      },
    });
  }
  let formData = await request.formData();
  let themeValue = String(formData.get("theme"));
  console.log("themeValue", themeValue);

  return redirect("/", {
    headers: {
      "Set-Cookie": await themeStorage.serialize({
        theme: themeValue,
      }),
    },
  });
}

export default function Index() {
  let data = useLoaderData<typeof loader>();
  console.log("data", data);
  return (
    <>
      <TitleWithWrapper>
        <Link
          className="text-gray-400 underline hover:text-primary-400"
          to="/entries/list"
        >
          Work log
        </Link>
        <Form method="post">
          <button
            type="submit"
            value={data?.theme === "dark" ? "light" : "dark"}
            name="theme"
          >
            THEME IS{" "}
          </button>
        </Form>
      </TitleWithWrapper>
    </>
  );
}
