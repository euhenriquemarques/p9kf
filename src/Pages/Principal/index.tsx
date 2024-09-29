import React from "react";
import "@fontsource/anton"; 
import { Outlet } from "react-router-dom";


const Principal: React.FC = () => {
 
  return (
    <div className="bg-gray-100 min-h-screen">
        <Outlet />
    </div>
  );
};

export default Principal;
