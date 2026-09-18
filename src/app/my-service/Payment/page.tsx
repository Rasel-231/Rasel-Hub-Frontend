import type { Metadata } from "next";
import PaymentContent from "./PaymentContent";

export const metadata: Metadata = {
  title: "Payments",
};

const PaymentPage = () => <PaymentContent />;

export default PaymentPage;