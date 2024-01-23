"use client";

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAppStore } from "@/store/store";
import { Button } from "../ui/button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  locale: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  locale,
}: CardWrapperProps) => {
  const { setFormType } = useAppStore();
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        {/* <BackButton label={backButtonLabel} href={backButtonHref} /> */}
        {backButtonLabel === "Already have an account?" ? (
          // <RegisterButton asChild locale={locale} mode="modal">
          <Button
            onClick={() => setFormType("login")}
            variant="link"
            size="sm"
            className="font-normal w-full"
          >
            {backButtonLabel}
          </Button>
        ) : (
          // <LoginButton asChild locale={locale} mode="modal">
          <Button
            onClick={() => setFormType("register")}
            variant="link"
            size="sm"
            className="font-normal w-full"
          >
            {backButtonLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
