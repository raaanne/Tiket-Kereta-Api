"use client";

import { removeCookie } from "@/helper/client-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};

const EmployeeTemplate = (myProp: props) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter()

  const handleLogout = () => {
    // menghapus token dari cookie
    removeCookie(`token`);
    router.replace(`/`); // direct login page
  }

  return (
    <div className="w-dvw">
      {/* header section */}
      <header className="w-full p-3 bg-gradient-to-br from-sky-500 to-sky-700 flex items-center gap-3">
        <button
          type="button"
          className="size-8 rounded-full flex justify-center items-center bg-sky-500 hover:bg-sky-600 text-white shadow-md"
          onClick={() => setShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white">SExpress</h1>
      </header>

      {/* side bar section */}
      <div
        className={`w-1/2 md:w-1/3 lg:w-1/4 bg-sky-500 h-dvh fixed top-0 transform transition-transform ${
          show ? "left-0" : "right-full"
        }`}
      >
        {/* `agar bisa manggil state show` */}

        {/* brand section */}
        <div className="w-full relative"> 
          <div className="w-full my-5 flex justify-center items-center text-white font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg> SExpress
          </div>

          <div className="absolute right-3 -top-5 cursor-pointer text-3xl font-bold text-white" onClick={() => setShow(false)}>
            &times;
          </div>
        </div>

        {/* menu section */}
        <div className="w-full flex flex-col">
          <Link
            href={`/karyawan/kereta`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-sky-400"
          >
            Data Kereta
          </Link>

          <Link
            href={`/karyawan/admin`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-sky-400"
          >
            Data Karyawan
          </Link>

          <Link
            href={`/karyawan/pelanggan`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-sky-400"
          >
            Data Pelanggan
          </Link>

          <Link
            href={`/karyawan/jadwal`}
            className="w-full rounded-md text-white p-3 font-semibold hover:bg-sky-400"
          >
            Jadwal Kereta
          </Link>

          <div className="w-full p-3 font-bold text-white cursor-pointer" onClick={() => handleLogout()}>
            Log out
          </div>
        </div>
      </div>

      {myProp.children}
    </div>
  );
};

export default EmployeeTemplate;
