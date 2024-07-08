"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Image from "next/image";
import { UserX } from "lucide-react";

function Profile() {
  const { user } = useKindeBrowserClient();
  const [emailData, setEmailData] = useState(null);
  const defaultImage = "public/82.jpg"; // Default image path in public directory

  useEffect(() => {
    if (user && user.email) {
      // Fetch email data from the API when the component mounts
      GlobalApi.getEmail(user.email)
        .then((response) => {
          const emailList = response.data.data;
          const foundEmail = emailList.find(
            (item) => item.attributes.email === user.email
          );
          setEmailData(foundEmail);
        })
        .catch((error) => {
          console.error("Error fetching email:", error);
        });
    }
    console.log("user,", user)
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" profile-container-wrapper mt-2 ">
      <div
        style={{
          width: "720px",
          height: "840px",
          backgroundImage: 'url("/82.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
        className="profile-container p-4 border mt-2 rounded-lg"
      >
        <h1 className="text-center profile-title">ຂໍ້ມູນສ່ວນຕົວ</h1>

        <div className="profile-details">
          <div className="p-4 border mt-2 text-center rounded-lg bg-slate-50 text-primary">
            <div className="profile-picture-wrapper">
              <Image
                src={user.picture || defaultImage}
                alt="Profile Picture"
                className="profile-picture rounded-full"
                width={500}
                height={500}
              />
            </div>
            <div className="profile-info">
              <p>
                <strong>ຊື້: </strong>{" "}
                <span className="text-primary">{user.given_name}</span>
              </p>
              <p>
                <strong>ນາມສະກຸນ: </strong>{" "}
                <span className="text-primary">{user.family_name}</span>
              </p>
              <p>
                <strong>ອີເມວ: </strong>{" "}
                <span className="text-primary">{user.email}</span>
              </p>

              {!emailData && (
                <>
                  <div className="pending flex justify-center items-center space-x-4 mt-5">
                    <Link href="users/AddNew" passHref>
                      <span className="relative flex h-10 w-10 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-10 w-10 rounded-md bg-green-800 opacity-180"></span>
                        <span className="animate-ping absolute inline-flex h-10 w-10 rounded-md bg-red-800 opacity-100"></span>
                        <span className="relative flex h-15 w-10 p-2 rounded-md bg-green-800 opacity-150 items-center justify-center">
                          <UserX className="text-center text-white" />
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div>
                    <p className="text-red-500 mt-5 flex justify-center items-center space-x-4">
                      ຍັງບໍ່ມີຂໍ້ມູນໃນລະບົບ ກະລຸນາປ້ອນຂໍ້ມູນ &quot;ກົດປຸ້ມດ້ານເທີງ&quot;!
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
      .profile-container-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 100px); /* Adjust this value as needed */
          margin-bottom: 10px; /* Adjust this value as needed */
          background-color: #f0f0f0; /* Adjust as needed */
        }
        .profile-container {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .profile-title {
          font-size: 24px;
          margin-bottom: 20px;
          color: #0d7a68;
        }
        .profile-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .profile-picture-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          margin: auto;
        }
        .profile-picture {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .profile-initial {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background-color: #0d7a68;
          font-size: 40px;
          font-weight: bold;
          color: #ef0505;
        }
        .profile-info {
          text-align: left;
          margin-top: 20px;
        }
        .profile-info p {
          margin: 5px 0;
          font-size: 16px;
          color: #555;
        }
      `}</style>
    </div>
  );
}

export default Profile;
