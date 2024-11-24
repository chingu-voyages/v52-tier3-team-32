import { LuUser2 } from "react-icons/lu";
import { fetchProfile } from "@/utils/actions";

async function UserIcon() {
  const user: any = await fetchProfile();
  if (user) {
    return (
      // eslint-disable-next-line
      <img
        src={user?.profileImage}
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;
