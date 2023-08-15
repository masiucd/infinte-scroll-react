import {createContext, type ReactNode, useState} from "react";

type Props = {
  children: ReactNode;
};

let DialogContext = createContext({});

export function Dialog({children}: Props) {
  let [on, setOn] = useState(false);
  return (
    <DialogContext.Provider value={{on, setOn}}>
      {children}
    </DialogContext.Provider>
  );
}
