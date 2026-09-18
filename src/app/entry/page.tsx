import type { Metadata } from "next";
import EntryForm from "../Components/EntryForm";

export const metadata: Metadata = {
  title: "Entry",
};

const entryPage = async () => {
  return (
    <div>
      <EntryForm />
    </div>
  );
};

export default entryPage;