"use client"
import React, { useEffect, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";

import Hero from "./_conponents/Hero";
import Filtering from "./_conponents/Dashboard";
import Dashboard from "./_conponents/Dashboard";
import CategorySearch from "./_conponents/CategorySearch";
import Doctorlist from "./_conponents/Doctorlist";

export default function Home() {
  const [doctorlist, setgetDoctorlist] = useState([]);

  useEffect(() => {
    getDoctorlist();
  
  }, []);

  const getDoctorlist = () => {

    GlobalApi.getDoctorlist()
      .then((resp) => {
        console.log(resp.data.data);
        setgetDoctorlist(resp.data.data);
       
      })
      .catch((error) => {
        console.error("Error fetching doctor list:", error);
      
      });
  };


const user={name:"mm"}

  return (
    <div className="">
      {user?(<>
        <Dashboard />
      
      <div style={{ marginTop: "50px" }}>
        <CategorySearch />
      </div>
      <Doctorlist doctorlist={doctorlist} />
      </>):(
        <>
        
        </>
      )}
    </div>
  );
}
