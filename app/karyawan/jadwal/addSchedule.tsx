"use client";

import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { KeretaType } from "../types";

type props = {
  trains: KeretaType[];
  // meyimoan array semua data kereta
};

const AddSchedule = (myProp: props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [departured_location, setDeparturedLocation] = useState<string>("");
  const [arrived_location, setArrivedLocation] = useState<string>("");
  const [departured_time, setDeparturedTime] = useState<Date>(new Date());
  const [arrived_time, setArrivedTime] = useState<Date>(new Date());
  const [train_id, setTrainId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const OpenModal = () => {
    setShow(true);
    setDeparturedLocation("");
    setArrivedLocation("");
    setDeparturedTime(new Date());
    setArrivedTime(new Date());
    setTrainId(0);
    setPrice(0);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `/schedule`;
      const requestData = {
        departured_location,
        arrived_location,
        departured_time,
        arrived_time,
        train_id,
        price,
      };
      const TOKEN = getCookie(`token`);
      const response: any = await axiosInstance.post(url, requestData, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const message = response.data.message;
      if (response.data.success === true) {
        setShow(false);
        toast(message, {
          containerId: `toastAddJadwal`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, {
          containerId: `toastAddJadwal`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        containerId: `toastAddJadwal`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastAddJadwal`} />
      <button
        className="px-2 py-2 rounded-md text-white bg-teal-800 hover:bg-teal-700"
        type="button"
        onClick={() => OpenModal()}
      >
        Tambah Jadwal Kereta
      </button>

      <Modal isShow={show}>
        {/* modal header */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            {/* rounded t adalah border top */}
            <h1 className="font-bold text-lg">Tambah Jadwal Kereta</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1 mx-1">
                Berangkat dari
              </small>
              <input
                type="text"
                id={`departured_location`}
                value={departured_location}
                onChange={(e) => setDeparturedLocation(e.target.value)}
                className="p-1 outline-none w-full focus:border-b-sky-700 focus:border-b"
                required={true}
              />
            </div>

            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1">
                Waktu Keberangkatan
              </small> <br />
              <DatePicker
                showTimeInput={true}
                className="p-1 outline-none w-full focus:border-b-sky-700 focus:border-b"
                id={"departured_time"}
                selected={new Date(departured_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                onChange={(date) =>
                  setDeparturedTime(date || new Date())
                }
                // jika MMMM diulang 4 kali maka bulan akan ditulis lengkap, MM digunakan digit, mm untuk menit
              />
            </div>

            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1">
                Tiba di
              </small>
              <input
                type="text"
                id={`arrived_location`}
                value={arrived_location}
                onChange={(e) => setArrivedLocation(e.target.value)}
                className="p-1 outline-none w-full focus:border-b-sky-700 focus:border-b"
                required={true}
              />
            </div>

            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1">
                Waktu Kedatangan
              </small> <br />
              <DatePicker
                showTimeInput={true}
                className="p-1 outline-none w-full focus:border-b-sky-700 focus:border-b"
                id={`arrived_time`}
                selected={new Date(arrived_time)}
                dateFormat={`dd MMMM yyyy HH:mm`}
                onChange={(date) =>
                  setArrivedTime(date || new Date())
                }
                // jika MMMM diulang 4 kali maka bulan akan ditulis lengkap, MM digunakan digit, mm untuk menit
              />
            </div>

            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1">
                Harga
              </small>
              <input
                type="number"
                id={`price`}
                value={price.toString()}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="p-1 outline-none w-full focus:border-b-sky-700 focus:border-b"
                required={true}
              />
            </div>

            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1">
                Jenis Kereta
              </small>
              <select
                id={"train_id"}
                value={train_id.toString()}
                onChange={(e) => setTrainId(Number(e.target.value))}
                className="p-1 outline-none w-full border focus:border-sky-700"
                required={true}
              >
                <option value="">Pilih Jenis Kereta</option>
                {myProp.trains.map((kereta, index) => (
                  <option value={kereta.id} key={`optionKereta-${index}`}>
                    {kereta.name}
                  </option>
                ))}
              </select>
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
export default AddSchedule;
