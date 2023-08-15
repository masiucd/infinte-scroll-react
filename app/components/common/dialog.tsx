import {AnimatePresence, motion} from "framer-motion";
import {type ReactNode} from "react";

import {useLockBodyScroll} from "~/lib/hooks/body_lock";
import {cn} from "~/lib/styles";

type Props = {
  children: ReactNode;
  className?: string;
};

function Header({children, className}: Props) {
  return (
    <div className={cn("flex justify-between bg-gray-200 p-1", className)}>
      {children}
    </div>
  );
}
function Body({children, className}: Props) {
  return (
    <div className={cn("flex flex-1 p-1 items-center", className)}>
      {children}
    </div>
  );
}

function Footer({children, className}: Props) {
  return (
    <div className={cn("flex justify-end gap-2 py-1 px-4", className)}>
      {children}
    </div>
  );
}

Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Footer = Footer;

type DialogProps = {
  open: boolean;
} & Props;

export function Dialog({children, open, className}: DialogProps) {
  useLockBodyScroll();
  return (
    open && (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 ">
          <motion.section
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.5, transition: {duration: 0.1}}}
            transition={{duration: 0.2, stiffness: 50, type: "spring"}}
            role="dialog"
            className={cn(
              "flex min-h-[12rem] min-w-[22rem] flex-col rounded-md border-2 border-gray-500 bg-white  text-gray-900",
              className
            )}
          >
            {children}
          </motion.section>
        </div>
      </AnimatePresence>
    )
  );
}
