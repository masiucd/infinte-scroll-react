import {type Icon, PenTool} from "react-feather";

export let Icons = Object.freeze({
  Pen: PenTool,
});

export type MyIcon = Icon;
export type IconName = keyof typeof Icons;
