import {Delete, type Icon, PenTool, X} from "react-feather";

export let Icons = Object.freeze({
  Pen: PenTool,
  Delete,
  X,
});

export type MyIcon = Icon;
export type IconName = keyof typeof Icons;
