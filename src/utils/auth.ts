import "server-only";

import {verify} from "jsonwebtoken";
import {cookies} from "next/headers";

export function isLoggedIn(): boolean {
  let cookiesStore = cookies();
  let record = cookiesStore.get("auth");
  if (record && record.value !== "") {
    let decoded = verify(record.value, process.env.JWT_SECRET ?? "") as Record<
      string,
      string | number | boolean
    >;
    let admin = decoded.admin as boolean;
    return admin;
  }
  return false;
}
