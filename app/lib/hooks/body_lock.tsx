import {useEffect} from "react";

export function useLockBodyScroll() {
  useEffect(() => {
    let originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
