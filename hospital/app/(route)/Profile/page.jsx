"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Image from "next/image";

function Profile() {
  const { user } = useKindeBrowserClient();
  const [emailData, setEmailData] = useState(null);

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
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "720px",
        height: "840px",
        backgroundImage: 'url("/82.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
      className="p-4 border mt-2 rounded-lg"
    >
      <h1 className="text-center profile-title">ຂໍ້ມູນສ່ວນຕົວ</h1>
      <div className="profile-container">
        <div className="profile-details">
          {user.picture && (
            <Image
              src={user.picture}
              alt="No Image"
              className="profile-picture"
              width={100}
              height={100}
            />
          )}
          <div className="profile-info">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </div>
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
                    <span className="relative flex h-10 w-10">
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-800 opacity-150"></span>
                      <span className="relative flex h-8 w-8 rounded-full bg-green-800 opacity-100"></span>
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

      <style jsx>{`
        .profile-container {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 0 auto;
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
        .profile-picture {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #0d7a68;
        }
        .profile-info {
          text-align: left;
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
