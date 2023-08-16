import {Delete, Edit, type Icon, PenTool, X} from "react-feather";

export let Icons = Object.freeze({
  Pen: PenTool,
  Delete,
  X,
  Edit,
});

export type MyIcon = Icon;
export type IconName = keyof typeof Icons;
