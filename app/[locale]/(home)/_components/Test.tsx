"use client";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

interface Props {}

export const Test = (props: Props) => {
  const { t } = useTranslation();
  const session = useSession();

  console.log(session);
  return <div>{t("title")}</div>;
};
