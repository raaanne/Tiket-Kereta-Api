"use client";
import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddKereta = () => {
  // berdasarkan dengan postman/dokumentasi
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setName("");
    setDesc("");
    setType("");
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const TOKEN = getCookie(`token`);
      const url = `/train`;
      const requestData = { name, descriptions: desc, type };

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
        Tambah Data Kereta
      </button>

      <Modal isShow={show}>
        {/* modal header */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            {/* rounded t adalah border top */}
            <h1 className="font-bold text-lg">Tambah Data Kereta</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md p3">
              <small className="text-sm font-semibold text-sky-700">
                Nama Kereta
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
                Descriptions Kereta
              </small>
              <input
                type="text"
                id={`desc`}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required={true}
                className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
              />
            </div>

            <div className="my-2 border rounded-md p3">
              <small className="text-sm font-semibold text-sky-700">
                Tipe Kereta
              </small>
              <input
                type="text"
                id={`type`}
                value={type}
                onChange={(e) => setType(e.target.value)}
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

export default AddKereta;
