"use client";

import { FormEvent, useState } from "react";
import { UserType } from "../types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/helper/client-cookie";
import { axiosInstance } from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/Modal";

type props = {
  pelanggan: UserType;
};

const EditPelanggan = (myProp: props) => {
  const [username, setUsername] = useState<string>("");
  const [nik, setNik] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddres] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setName(myProp.pelanggan.name);
    setAddres(myProp.pelanggan.address);
    setNik(myProp.pelanggan.nik);
    setUsername(myProp.pelanggan.user_details.username);
    setPhone(myProp.pelanggan.phone);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const TOKEN = getCookie(`token`);
      const url = `/customer/${myProp.pelanggan.id}`;
      const requestData = { name, nik, username, address, phone };

      //    hit endpoint to add kereta
      const response: any = await axiosInstance.put(url, requestData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const message = response.data.message;
      if (response.data.success == true) {
        toast(message, { containerId: `toastEditPelanggan-${myProp.pelanggan.id}`, type: "success" });
        setShow(false);
        // reload page
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, { containerId: `toastEditPelanggan-${myProp.pelanggan.id}`, type: "warning" });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        containerId: `toastEditPelanggan-${myProp.pelanggan.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastEditPelanggan-${myProp.pelanggan.id}`} />
      <button
        type="button"
        className="px-2 py-1 rounded-md bg-sky-800 hover:bg-sky-700 text-white"
        onClick={() => openModal()}
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>

      <Modal isShow={show}>
        {/* modal header */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            {/* rounded t adalah border top */}
            <h1 className="font-bold text-lg">Edit Data Pelanggan</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md p3">
              <small className="text-sm font-semibold text-sky-700">
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

            <div className="my-2 border rounded-md p3">
              <small className="text-sm font-semibold text-sky-700">
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

export default EditPelanggan;
