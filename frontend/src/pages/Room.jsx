import { useState } from "react";
import { useEffect } from "react";

import NewModal from "../components/NewModal";

import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";

import { MdAdd } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import ImageModal from "../components/imageModal";
import UpdateModal from "../components/UpdateModal";

const Room = () => {
  const [modalNew, setModalNew] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [modalUpdate,setModalUpdate] = useState(false)

  const [rooms, setRooms] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState({});
  const [updateRoom,setUpdateRoom] = useState(null)
  const [fileRoom, setFileRoom] = useState(null);
  const [roomImages,setRoomImages] = useState([])

  const chooseFile = (files) => {
    if (files !== undefined) {
      if (files !== null) {
        if (files.length > 0) {
          const file = files[0];
          setFileRoom(file);
        }
      }
    }
  };

  const uploadFile = async () => {
    try {
      if (fileRoom !== null) {
        let formData = new FormData();
        formData.append("fileRoom", fileRoom);
        const headers = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(
          config.apiPath + "/roomImage/create/" + selectedRoom.id,
          formData,
          headers,
        );
        Swal.fire({
          title: "Success",
          text: "Upload Success",
          icon: "success",
          timer: 1000,
        });
        fetchDataRoomImages(selectedRoom.id)

        setFileRoom(null);
        setModalImage(false);
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

  const fetchDataRoomImages = async(roomId)=>{
    try {
      const res = await axios.get(
        config.apiPath + "/roomImage/list/" + roomId
      )

      if(res.data.results !== undefined){
        setRoomImages(res.data.results)

      }
    } catch (err) {
      Swal.fire({
        title:"Error",
        text:err.messaage,
        icon:"error"
      })
      
    }
  }
  const removeRoomImage = async(image)=>{
    try {
      const button = await Swal.fire({
        title:"ลบภาพ",
        text:"ยืนยันการลบภาพของห้องนี้",
        icon:"question",
        showCancelButton:true,
        showConfirmButton:true
      })

      if(button.isConfirmed){
        await  axios.delete(config.apiPath + "/roomImage/remove/"+image.id)
        fetchDataRoomImages(image.roomId)
      }

    } catch (err) {
      Swal.fire({
        title:"Error",
        text:err.message,
        icon:"error"
      })
      
    }
  }

  const handleSave = async (data) => {
    try {
      const payload = {
        name: data.name,
        price: data.price,
      };

      const res = await axios.post(config.apiPath + "/room/create", payload);

      if (res.data.message == "success") {
        Swal.fire({
          title: "Save",
          text: "Save Success",
          icon: "success",
          timer: 1000,
        });
        fetchData();
        setModalNew(false);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "error",
        text: err.message,
        icon: "error",
      });
    }
  };
   const handleUpdate = async (data) => {
      try {
        const payload = {
          name: data.name,
          price: data.price,
        };
  
        const res = await axios.put(config.apiPath + "/room/" + data.id, payload);
        if (res.data.message === "success") {
          Swal.fire({
            title: "Success",
            text: "Update Success",
            icon: "success",
            timer: 1000,
          });
  
          fetchData()
          setModalUpdate(false)
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
      }
    };

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/room/list");

      if (res.data.results !== undefined) {
        setRooms(res.data.results);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (room) => {
    try {
      const button = await Swal.fire({
        title: "Delete Room ?",
        text: "Are you Sure?",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      });

      if (button.isConfirmed) {
        const res = await axios.delete(
          config.apiPath + "/room/remove/" + room.id,
        );

        if (res.data.message == "success") {
          fetchData();
        }
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Errpr",
        text: err.message,
        icon: "error",
      });
    }
  };

  const chooseRoom = (room) => {
    setSelectedRoom(room);
    fetchDataRoomImages(room.id)
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">ห้องพัก</h1>

        <button
          onClick={() => setModalNew(true)}
          type="button"
          className="cursor-pointer 
            flex items-center gap-2 text-white px-4 py-2 bg-blue-500 w-fit rounded-md font-semibold"
        >
          <MdAdd size={30} />
          New Record
        </button>
        {modalNew && (
          <>
            <div
              onClick={() => setModalNew(false)}
              className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center w-full h-full"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-md p-6 w-full shadow-2xl max-w-2xl"
              >
                <NewModal
                  onClose={() => setModalNew(false)}
                  onSave={handleSave}
                />
              </div>
            </div>
          </>
        )}
        {modalImage && (
          <>
            <div
              onClick={() => setModalImage(false)}
              className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center w-full h-full"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-md p-6 w-full shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <ImageModal
                  onClose={() => setModalImage(false)}
                  selectedRoom={selectedRoom}
                  onChooseFile={chooseFile}
                  onSave={uploadFile}
                  roomImages={roomImages}
                  onRemove={removeRoomImage}
                />
              </div>
            </div>
          </>
        )}
        {modalUpdate  && updateRoom &&(
          <>
          <div
          onClick={()=>{
            setModalUpdate(false)
            setUpdateRoom(null)
          }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center w-full h-full">
          <div 
          onClick={(e)=>e.stopPropagation()}
          className="bg-white rounded-md p-6 w-full max-w-2xl shadow-2xl ">
            <UpdateModal
            onClose={()=>{setModalUpdate(false); setUpdateRoom(null);}}
            room={updateRoom}
            onSave={handleUpdate}
            />
          </div>
          </div>
          </>
        )}

        <div className="bg-white shadow-md  rounded-lg overflow-hidden border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">
                  ลำดับ
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">
                  ชื่อห้อง
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">
                  ราคา / วัน
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border border-gray-300">
                  จัดการ
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 ">
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                      {room.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                      {room.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border border-gray-300">
                      {room.price} บาท
                    </td>
                    <td className="flex gap-2 justify-center px-6 py-4 text-sm text-gray-700 ">
                      <button
                        onClick={() => {
                          setModalImage(true);
                          chooseRoom(room);
                        }}
                        className="bg-green-500 px-2 py-2 rounded-md cursor-pointer"
                      >
                        <FaImage size={20} color="white" />
                      </button>
                      <button 
                      onClick={()=>{
                        setUpdateRoom(room)
                        setModalUpdate(true)

                      }}
                      className="bg-blue-500 px-2 py-2 rounded-md cursor-pointer">
                        <FaPencilAlt size={20} color="white" />
                      </button>
                      <button
                        onClick={() => handleDelete(room)}
                        className="bg-red-500 px-2 py-2 rounded-md cursor-pointer"
                      >
                        <MdDelete size={20} color="white" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    ไม่มีข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Room;
