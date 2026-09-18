import type { Metadata } from "next";
import ProfileContent from "./ProfileContent";

export const metadata: Metadata = {
  title: "My Profile",
};

const ProfilePage = () => <ProfileContent />;

export default ProfilePage;