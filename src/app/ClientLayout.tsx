"use client"
import CustomNavbar from './Components/Navbar';
import { Layout } from 'antd';
import CustomFooter from './Components/Footer';


const {Content}=Layout;

const ClientLayout =({children}:{children:React.ReactNode})=>{
return(
    <Layout style={{ minHeight: "100vh" }}>
        <CustomNavbar/>
        <Content style={{minHeight:"100vh"}}>{children}</Content>
        <CustomFooter/>
    </Layout>
)
}

export default ClientLayout;