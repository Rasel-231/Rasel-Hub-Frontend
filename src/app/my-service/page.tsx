import type { Metadata } from "next";
import ServiceLanding from "./ServiceLanding";

export const metadata: Metadata = {
  title: "My Services",
};

const MyServicePage = () => <ServiceLanding />;

export default MyServicePage;