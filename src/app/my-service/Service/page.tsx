import type { Metadata } from "next";
import ServiceContent from "./ServiceContent";

export const metadata: Metadata = {
  title: "My Service",
};

const ServicePage = () => <ServiceContent />;

export default ServicePage;