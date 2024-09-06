import { Dropdown } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Logout";


export function DropdownComponent() {
  const {user} = useAuth0();
  return (
    <Dropdown label="" className="p-4 " renderTrigger={()=><img src={user?.picture} className="size-8 rounded-full"/>}>
      <Dropdown.Header className="pb-2">
        <span className="block text-sm pb-2 font-semibold">{user?.name}</span>
        <span className="block truncate text-sm font-medium">{user?.email}</span>
      </Dropdown.Header>
      <div className="w-full bg-gray-600 h-0.5 opacity-50">

      </div>
      <Dropdown.Divider />
      <Dropdown.Item><LogoutButton /></Dropdown.Item>
    </Dropdown>
  );
}
