import { useTranslation } from "react-i18next";

export function useTranslations(keyPrefix?: string) {
  return useTranslation(undefined, { keyPrefix });
}