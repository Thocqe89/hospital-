
"use client"
import React, { useEffect, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";


import Dashboard from "./_conponents/Dashboard"; // Correct the path here too if needed
import CategorySearch from "./_conponents/CategorySearch"; // Correct the path here too if needed
import Doctorlist from '@/app/_conponents/Doctorlist';


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

  const user = { name: "mm" };

  return (
    <div className="">
      {user ? (
        <>
          <Dashboard />
          <div style={{ marginTop: "50px" }}>
            <CategorySearch />
          </div>
          <Doctorlist doctorlist={doctorlist} />
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
}
