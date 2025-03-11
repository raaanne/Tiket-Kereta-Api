"use client";

import { useRouter } from "next/navigation";
import { ScheduleType } from "../types";
import { FormEvent, useState } from "react";
import { getCookie } from "@/helper/client-cookie";
import { axiosInstance } from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/Modal";
import DatePicker from "react-datepicker";

type props = {
  schedule: ScheduleType
};

const EditSchedule = (myProp: props) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [departured_location, setDeparturedLocation] = useState<string>("");
  const [arrived_location, setArrivedLocation] = useState<string>("");
  const [departured_time, setDeparturedTime] = useState<Date>(new Date());
  const [arrived_time, setArrivedTime] = useState<Date>(new Date());
  const [price, setPrice] = useState<number>(0);

  const openModal = () => {
    setShow(true);
    setDeparturedLocation(myProp.schedule.departured_location);
    setArrivedLocation(myProp.schedule.arrived_location);
    setDeparturedTime(new Date(myProp.schedule.departured_time));
    setArrivedTime(new Date(myProp.schedule.arrived_time));
    setPrice(myProp.schedule.price);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `/schedule/${myProp.schedule.id}`;
      const requestData = {
        departured_location,
        arrived_location,
        departured_time,
        arrived_time,
        price
      };
      const TOKEN = getCookie(`token`);
      const response: any = await axiosInstance.put(url, requestData, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const message = response.data.message;
      if (response.data.success === true) {
        setShow(false);
        toast(message, {
          containerId: `toastEditJadwal-${myProp.schedule.id}`,
          type: `success`,
        });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, {
          containerId: `toastEditJadwal-${myProp.schedule.id}`,
          type: `warning`,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        containerId: `toastEditJadwal-${myProp.schedule.id}`,
        type: `error`,
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastEditJadwal-${myProp.schedule.id}`}
      />
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
            <h1 className="font-bold text-lg">Edit Jadwal Pelanggan</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md">
              <small className="text-xs font-semibold text-sky-700 mx-1">
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

export default EditSchedule;
