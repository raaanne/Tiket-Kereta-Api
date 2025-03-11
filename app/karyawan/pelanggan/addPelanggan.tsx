"use client";

import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddPelanggan = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nik, setNik] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddres] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setName("");
    setAddres("");
    setNik("");
    setUsername("")
    setPassword("")
    setPhone("")
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
        try {
          e.preventDefault();
          const TOKEN = getCookie(`token`);
          const url = `/customer/register`;
          const requestData = { name, nik, username, password, address, phone };
    
          //    hit endpoint to add kereta
          const response: any = await axiosInstance.post(url, requestData, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
    
          const message = response.data.message;
          if (response.data.success == true) {
            toast(message, { containerId: `toastAdd`, type: "success" });
            setShow(false);
            // reload page
            setTimeout(() => router.refresh(), 1000);
          } else {
            toast(message, { containerId: `toastAdd`, type: "warning" });
          }
        } catch (error) {
          console.log(error);
          toast(`Something wrong`, {
            containerId: `toastAdd`,
            type: "error",
          });
        }
      };

      return (
        <div>
          <ToastContainer containerId={`toastAdd`} />
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-teal-800 hover:bg-teal-700 text-white"
            onClick={() => openModal()}
          >
            Tambah Data Pelanggan
          </button>
    
          <Modal isShow={show}>
            {/* modal header */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="w-full p-3 rounded-t-lg">
                {/* rounded t adalah border top */}
                <h1 className="font-bold text-lg">Tambah Data Pelanggan</h1>
                <span className="text-sm text-slate-400">
                  Pastikan data yang diisi benar
                </span>
              </div>
    
              {/* modal body */}
              <div className="w-full p-3">
                <div className="my-2 border rounded-md">
                  <small className="text-sm font-semibold text-sky-700 ml-1">
                    Nama Pelanggan
                  </small>
                  <input
                    type="text"
                    id={`name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                    className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
                  />
                </div>
    
                <div className="my-2 border rounded-md">
                  <small className="text-sm font-semibold text-sky-700 ml-1">
                    Username Pelanggan
                  </small>
                  <input
                    type="text"
                    id={`username`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                    className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
                  />
                </div>
    
                <div className="my-2 border rounded-md">
                  <small className="text-sm font-semibold text-sky-700 ml-1">
                    NIK Pelanggan
                  </small>
                  <input
                    type="text"
                    id={`nik`}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    required={true}
                    className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
                  />
                </div>

                <div className="my-2 border rounded-md">
                  <small className="text-sm font-semibold text-sky-700 ml-1">
                    Password Pelanggan
                  </small>
                  <input
                    type="password"
                    id={`password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
                  />
                </div>

                <div className="my-2 border rounded-md">
                  <small className="text-sm font-semibold text-sky-700 ml-1">
                    Address Pelanggan
                  </small>
                  <input
                    type="text"
                    id={`address`}
                    value={address}
                    onChange={(e) => setAddres(e.target.value)}
                    required={true}
                    className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
                  />
                </div>

                <div className="my-2 border rounded-md">
                  <small className="text-sm font-semibold text-sky-700 ml-1">
                    Phone Pelanggan
                  </small>
                  <input
                    type="text"
                    id={`phone`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={true}
                    className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
                  />
                </div>
              </div>
    
              {/* modal footer */}
              <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                {/* justify end ke kanan */}
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
                >
                  Close
                </button>
    
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-sky-800 hover:bg-sky-700 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
        </div>
      );
};

export default AddPelanggan;
