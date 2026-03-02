import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import config from "../config";
import {Link} from "react-router-dom"
const SideBar = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token_flutter"),
        },
      };

      const res = await axios.get(config.apiPath + "/user/info", headers);

      if (res.data.id !== undefined) {
        setName(res.data.name);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="w-64 bg-[#0F2854] text-white flex flex-col">
      <div className="p-4 border-b-8 border-[#1C4D8D]">
        <div className="font-semibold">{name}</div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/room" className="block p-2 rounded hover:text-[#4988C4]">
          ห้องพัก
        </Link>
        <Link to="/roomRent" className="block p-2 rounded hover:text-[#4988C4]">
          รายการจองห้อง
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
