//import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from 'lucide-react';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <div className="flex gap-2 font-semibold hover:text-red-600 ">
    Log Out<LogOut/>
    </div>  
    </button>
  );
};

export default LogoutButton;