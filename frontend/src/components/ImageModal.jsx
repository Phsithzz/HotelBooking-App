import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";
import config from "../config";

const ImageModal = ({ onClose, selectedRoom, onSave, onChooseFile,roomImages ,onRemove}) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-semibold">เลือกภาพของห้องพัก</h1>
          <button
            onClick={onClose}
            className="cursor-pointer hover:text-red-500 
              transition ease-in duration-200"
          >
            <ImCross size={20} />
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-4  ">
            <label htmlFor="name" className="font-semibold text-lg w-[20%]">
              ห้องพัก
            </label>
            <input
              type="text"
              disabled
              value={selectedRoom?.name || ""}
              className="w-full border-2 border-gray-300 py-2 px-2 bg-gray-200 rounded-md"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="name" className="font-semibold text-lg w-[20%]">
              เลือกภาพ
            </label>
            <input
              onChange={(e) => onChooseFile(e.target.files)}
              type="file"
              className="w-full border-2 border-gray-300 py-2 px-2 rounded-md"
            />
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roomImages.length>0 ?(
                roomImages.map((image)=>(
              
                        <div key={image.id}  className="flex flex-col">
                            <img src={config.apiPath+"/uploads/"+image.name} alt={image.name} className="w-full h-30 object-cover "/>
                            <button 
                            onClick={()=>onRemove(image)}
                            className="cursor-pointer hover:bg-red-600 transition-colors duration-300 ease-in
                            text-white font-semibold flex justify-center gap-2 bg-red-500 px-4 py-2 rounded-md">
                                 <ImCross size={20} />
                                ลบรูปภาพ
                            </button>
                        </div>
             
                ))
            ):(
                <></>
            )}
        </div>

        <button
          onClick={onSave}
          className="cursor-pointer 
          hover:bg-blue-600 transition-colors duration-300 ease-in
                flex items-center justify-center self-center gap-2 text-white px-4 py-2 bg-blue-500  rounded-md font-semibold"
        >
          <FaCheck size={20} />
          บันทึกภาพของห้องนี้
        </button>
      </div>
    </>
  );
};

export default ImageModal;
