//import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}
  className="bg-white-600 text-black font-semibold py-2 px-4 rounded-lg border-2 border-black shadow-lg hover: bg-white focus:outline-none transition duration-200">Log In</button>;
};

export default LoginButton;