import {type LoaderArgs} from "@remix-run/node";

import {logout} from "~/lib/cookies.server";

export async function loader({request}: LoaderArgs) {
  return await logout(request);
}

// export default function Page() {
//   return (
//     <div>Page</div>
//   )
// }
