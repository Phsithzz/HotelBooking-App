import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";


const UpdateModal = ({ onClose, room, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if(room){
    setName(room.name);
    setPrice(room.price);}
  }, [room]);   


 
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-semibold">จัดการห้องพัก</h1>
        <button
          onClick={onClose}
          className="cursor-pointer hover:text-red-500 
          transition ease-in duration-200"
        >
          <ImCross size={20} />
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-lg">
            ชื่อห้องพัก
          </label>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="border-2 border-gray-300 py-2 px-2 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-lg ">
            ราคาห้องต่อวัน
          </label>
          <input
            type="text"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="border-2 border-gray-300 py-2 px-2 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={()=>onSave({id:room.id,name,price})}
        className="cursor-pointer 
            flex items-center gap-2 text-white px-4 py-2 bg-blue-500 w-fit rounded-md font-semibold"
      >
        <FaCheck size={20} />
        บันทึก
      </button>
    </div>
  );
};

export default UpdateModal;
