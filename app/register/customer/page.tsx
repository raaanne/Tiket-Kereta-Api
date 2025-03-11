"use client"

import { axiosInstance } from "@/helper/api";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const RegisterCustomerPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [nik, setNik] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Submit diklik!"); // Cek apakah fungsi dijalankan
      
        try {
          const url = `/customer/register`;
          const requestData = { username, password, nik, name, address, phone };
      
          console.log("Mengirim data ke server:", requestData); // Cek request
          const responseData: any = await axiosInstance.post(url, requestData);
      
          console.log("Response dari server:", responseData); // Cek response
      
          if (responseData.data.success === false) {
            toast(responseData.data.message, { type: "warning", containerId: `toastRegisterCustomer` });
          } else {
            toast("Registrasi berhasil! Silakan login.", { type: "success", containerId: `toastRegisterCustomer` });
            setTimeout(() => router.replace(`/`), 1500);
          }
        } catch (error: any) {
          console.log("Terjadi kesalahan:", error.response ? error.response.data : error);
          toast("Terjadi kesalahan, silakan coba lagi.", { containerId: `toastRegisterCustomer`, type: "error" });
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
                <div className="w-full bg-sky-700 text-white p-2">
                  <h1 className="text-xl font-bold">Register</h1>
                </div>
        
                {/* login body */}
                <div className="w-full p-5">
                  <div className="mb-3">
                    <span className="text-sm text-blue-700">Username</span>
                    <input
                    autoComplete="off"
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
                    autoComplete="off"
                      type="password"
                      id={`password`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <span className="text-sm text-blue-700">NIK</span>
                    <input
                      type="text"
                      id={`nik`}
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      required={true}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <span className="text-sm text-blue-700">Nama</span>
                    <input
                      type="text"
                      id={`nama`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={true}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <span className="text-sm text-blue-700">Alamat</span>
                    <input
                      type="text"
                      id={`address`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={true}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div className="mb-3">
                    <span className="text-sm text-blue-700">Telepon</span>
                    <input
                      type="text"
                      id={`phone`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required={true}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
        
                  <button
                    type="submit"
                    className="bg-teal-900 hover:bg-teal-800 text-white w-full rounded-md px-4 py-2 mt-3"
                  >
                    Register
                  </button>
        
                   {/* Link ke halaman register */}
                   {/* <div className="text-center mt-3">
                    <span className="text-sm">Belum punya akun? </span>
                    <Link href="/register/admin" className="text-blue-700 hover:underline">
                      Daftar di sini
                    </Link>
                    </div> */}
                    
                </div>
              </form>
            </div>
          );
    }

    export default RegisterCustomerPage