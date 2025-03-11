"use client";

import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type props = {
  id_wagon: number;
};

const AddSeat = (myProp: props) => {
  const [wagon_id, setWagonId] = useState<number>(0);
  const [seat_number, setSeatNumber] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setSeatNumber("");
    setWagonId(myProp.id_wagon);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const TOKEN = getCookie(`token`);
      const url = `/train/wagon/seat`;
      const requestData = {
        seat_number,
        wagon_id,
      };

      const response: any = await axiosInstance.post(url, requestData, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      const message = response.data.message;
      if (response.data.success == true) {
        setShow(false);
        toast(message, {
          containerId: `toastAddSeat-${myProp.id_wagon}`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, {
          containerId: `toastAddSeat-${myProp.id_wagon}`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        containerId: `toastAddSeat-${myProp.id_wagon}`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastAddSeat-${myProp.id_wagon}`} />
      <button
        type="button"
        onClick={() => openModal()}
        className="size-16 flex items-center justify-center rounded-md bg-teal-700 hover:bg-teal-600 text-white"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      
      <Modal isShow={show}>
        <form onSubmit={handleSubmit}>
          <div className="w-full p-3 rounded-t-lg">
            {/* rounded t adalah border top */}
            <h1 className="font-bold text-lg">Tambah Kursi Kereta</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md p3">
              <small className="text-sm font-semibold text-sky-700">
                Nomer Kursi
              </small>
              <input
                type="text"
                id={`seat_number`}
                value={seat_number}
                onChange={(e) => setSeatNumber(e.target.value)}
                required={true}
                className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
              />
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
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AddSeat;
