import {AnimatePresence, motion} from "framer-motion";
import {type ReactNode} from "react";

type Props = {
  children: ReactNode;
};

function Header({children}: Props) {
  return <div className="flex justify-between bg-green-300">{children}</div>;
}
function Body({children}: Props) {
  return (
    <div className="flex flex-1 items-center border-4 border-red-300">
      {children}
    </div>
  );
}

function Footer({children}: Props) {
  return <div className="flex justify-end gap-2 border px-4">{children}</div>;
}

Dialog.Header = Header;
Dialog.Body = Body;
Dialog.Footer = Footer;

type DialogProps = {
  open: boolean;
} & Props;

export function Dialog({children, open}: DialogProps) {
  return (
    open && (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 ">
          <motion.section
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.5, transition: {duration: 0.1}}}
            transition={{duration: 0.2}}
            role="dialog"
            className="flex min-h-[12rem] min-w-[22rem] flex-col rounded-md border-4 border-red-400 bg-white p-1 text-gray-900"
          >
            {children}
          </motion.section>
        </div>
      </AnimatePresence>
    )
  );
}
