import { ReactNode } from "react";
import Layout from "./_components/common/Layout";

interface AdminLayoutProps {
  children: ReactNode;
  // params: any;
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <Layout>{children}</Layout>;
};

export default AdminLayout;
