"use client"
import CustomNavbar from './Components/Navbar';
import { Layout } from 'antd';
import CustomFooter from './Components/Footer';

const { Content } = Layout;

const ClientLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--background)",
    }}
  >
    <CustomNavbar />
    <Content style={{ flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
      {children}
    </Content>
    <CustomFooter />
  </Layout>
);

export default ClientLayout;