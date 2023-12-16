import { getSession } from "~/session.server";

export async function validateAdmin(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.get("admin")) {
    throw new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }
}
