import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  // return session;
  return session.data?.user;
};
