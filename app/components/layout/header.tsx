import {type SerializeFrom} from "@remix-run/node";
import {Link} from "@remix-run/react";

import {type AppRouteType} from "~/utils/config";

import {Lead} from "../ui/typography";

type Props = {
  routes: SerializeFrom<AppRouteType>[];
};
export default function Header({routes}: Props) {
  return (
    <header>
      <div>
        <Lead className="capitalize">My working journal</Lead>
        <nav>
          <ul className="flex list-none gap-2">
            {routes.map((route) => (
              <li key={route.to} className="capitalize">
                <Link to={route.to}>{route.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
