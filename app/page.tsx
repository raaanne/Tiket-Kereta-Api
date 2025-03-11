"use client";

import { axiosInstance } from "@/helper/api";
import { storeCookie } from "@/helper/client-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    try {
      // lihat dari postman, urlnya, request dan response
      e.preventDefault();

      // base url sudah ada di helper
      const url = `/auth`;

      // request data
      const requestData = {
        username,
        password,
      };

      // hit endpoint
      const responseData: any = await axiosInstance.post(url, requestData);

      // response data
      if (responseData.data.success === false) {
        // let bisa berubah ubah
        const message = responseData.data.message;
        toast(message, { type: "warning", containerId: `toastLogin` });
      } else {
        const message = responseData.data.message;
        const token = responseData.data.token;
        const role = responseData.data.role;

        // store token in cookie
        storeCookie(`token`, token);

        toast(message, { type: "success", containerId: `toastLogin` });

        if(role === `ADMIN`){ 
          
          // jika role login adalah admin, maka ada di direct ke halaman kereta
          setTimeout(() => router.replace(`/karyawan/kereta`), 1000)
          // set time out untuk menjeda 1 detik agar toastnya kelihatan
          
        } else if (role === `CUSTOMER`){
          // direct ke halaman jadwal
          setTimeout(() => router.replace(`/pelanggan/jadwal`), 1000)
        }

      }
    } catch (error) {
      console.log(error);
      toast(`Something is wrong`, { containerId: `toastLogin`, type: "error" });
      // toast untuk notifikasi
    }
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer containerId={`toastLogin`} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-5/6 md:w-1/2 border rounded-lg"
      >
        {/* Header login */}
        <div className="w-full bg-sky-700 text-white p-1">
          <h1 className="text-xl font-bold">Login</h1>
        </div>

        {/* login body */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm text-blue-700">Username</span>
            <input
              type="text"
              id={`username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-3">
            <span className="text-sm text-blue-700">Password</span>
            <input
              type="password"
              id={`password`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-teal-900 hover:bg-teal-800 text-white w-full rounded-md px-4 py-2"
          >
            Login
          </button>

           {/* Link ke halaman register */}
           <div className="text-center mt-3">
            <span className="text-sm">Belum punya akun? </span>
            <Link href="/register/customer" className="text-blue-700 hover:underline">
              Daftar di sini
            </Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
