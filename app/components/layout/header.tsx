import {type SerializeFrom} from "@remix-run/node";
import {Link} from "@remix-run/react";

import {type AppRouteType} from "~/utils/config";

type Props = {
  routes: SerializeFrom<AppRouteType>[];
};
export default function Header({routes}: Props) {
  return (
    <header>
      <div>
        <span className="capitalize">My working journal</span>
        <nav>
          <ul className="flex list-none gap-2">
            {routes.map((route) => (
              <li key={route.to}>
                <Link to={route.to}>{route.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
