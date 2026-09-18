import type { Metadata } from "next";
import ClientHuntsContent from "./ClientHuntsContent";

export const metadata: Metadata = {
  title: "Client Hunts",
};

const ClientHuntsPage = () => <ClientHuntsContent />;

export default ClientHuntsPage;