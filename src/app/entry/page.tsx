import type { Metadata } from "next";
import EntryForm from "../Components/EntryForm";
import { requireAuth } from "@/app/lib/authGuard";

export const metadata: Metadata = {
  title: "Entry",
};

const entryPage = async () => {
  await requireAuth("/entry");
  return (
    <div>
      <EntryForm />
    </div>
  );
};

export default entryPage;