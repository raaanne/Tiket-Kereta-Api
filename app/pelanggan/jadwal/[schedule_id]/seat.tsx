"use client";

import { SeatType } from "@/app/karyawan/types";
import Modal from "@/components/Modal";
import { FormEvent, useState } from "react";

type SeatBook = {
    passanger_id: string
    passanger_name: string
    seat_number: string
}

type props = {
  item: SeatType
  onSave: (item: SeatBook) => void
};


const Seat = (myProp: props) => {
  const [show, setShow] = useState<boolean>(false);
  const [passanger_id, setPassangerId] = useState<string>("");
  const [passanger_name, setPassangerName] = useState<string>("");

  const openModal = () => {
    setShow(true);
    setPassangerId("");
    setPassangerId("");
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setShow(false)
        myProp.onSave({
            passanger_id, passanger_name, seat_number: myProp.item.seat_number
        })
    };

  return (
    <div>
      <button
        className="size-10 flex items-center justify-center font-bold rounded-md bg-sky-700 disabled:bg-slate-500 text-white"
        type="button"
        disabled={myProp.item.used}
        onClick={() => openModal()}
      >
        {myProp.item.seat_number}
      </button>

      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            {/* rounded t adalah border top */}
            <h1 className="font-bold text-lg">Identitas Penumpang</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2">
                <small className="text-xs font-semibold text-sky-700">Nomor Kursi</small> <br />
                <strong className="font-semibold">{myProp.item.seat_number}</strong>
            </div>

            <div className="my-2">
                <small className="text-xs font-semibold text-sky-700">NIK Penumpang</small> <br />
                <input type="number"
                id={`nik-${myProp.item.id}`}
                required={true} 
                value={passanger_id}
                onChange={e => setPassangerId(e.target.value)}
                className="w-full p-2 rounded-md border text-sm"/>
            </div>

            <div className="my-2">
                <small className="text-xs font-semibold text-sky-700">Nama Penumpang</small> <br />
                <input type="text"
                id={`nama-${myProp.item.id}`}
                required={true} 
                value={passanger_name}
                onChange={e => setPassangerName(e.target.value)}
                className="w-full p-2 rounded-md border text-sm"/>
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

export default Seat;
