import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Logout() {
  const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem("adminToken");

    navigate("/admin/login");
    };

  return(
    <>
        <button className="sidebar-logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Log-out</span>
        </button>
    </>
  )
}

export default Logout;