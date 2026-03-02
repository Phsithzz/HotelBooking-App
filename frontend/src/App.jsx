import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Room from "./pages/Room";
import RoomRent from "./pages/RoomRent";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<SignIn />} />

          <Route element={<MainLayout />}>
   
            <Route path="/room" element={<Room/>}/>
            <Route path="/roomRent" element={<RoomRent/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
