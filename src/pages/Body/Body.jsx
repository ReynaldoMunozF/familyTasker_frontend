import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Profile } from "../Profile/Profile";
import { Pruebas } from "../pruebas/pruebas";





export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pruebas" element={<Pruebas />} />
        
      </Routes>
    </>
  );
};
