import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {isLoggedIn} from "@/utils/auth";
import {destroyCookie} from "@/utils/cookie";

export default function DashboardPage() {
  let is = isLoggedIn();
  if (!is) {
    return redirect("/");
  }
  return (
    <div>
      <h1>DashboardPage</h1>
      <form
        action={async () => {
          "use server";
          destroyCookie("auth");
          revalidatePath("/");
        }}
      >
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
