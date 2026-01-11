import i18next from "i18next";
import { useEffect, useState } from "react";

export function useDirection() {
  const [dir, setDir] = useState(i18next.dir());

  useEffect(() => {
    const updateDir = () => setDir(i18next.dir());

    i18next.on("languageChanged", updateDir);
    return () => {
      i18next.off("languageChanged", updateDir);
    };
  }, []);

  return dir;
}