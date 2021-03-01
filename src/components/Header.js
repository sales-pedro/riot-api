import React from "react";

import { logout } from "../firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const Header = () => {
  const history = useHistory();
  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <div className="w-full shadow-xl mb-5 flex justify-between">
      <h2 className="p-5 font-bold">
        <a href="/">API</a>
      </h2>
      {!!user && (
        <button
          className="bg-black text-white border border-gray-500 p-2 my-2 mr-10 rounded-lg hover:bg-gray-700"
          onClick={logoutUser}
        >
          LOGOUT
        </button>
      )}
    </div>
  );
};
export default Header;
