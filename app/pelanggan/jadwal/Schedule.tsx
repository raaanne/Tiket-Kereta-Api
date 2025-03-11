import { ScheduleType } from "@/app/karyawan/types";
import Link from "next/link";

type props = {
  item: ScheduleType;
};

export const showTime = (date: string) => {
  const currentDate = new Date(date);
  return currentDate.toLocaleTimeString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

const Schedule = (myProp: props) => {
  return (
    <div className="flex w-full border rounded-md shadow-sm my-3 bg-sky-50 bg-opacity-45">
      <div className="w-full p-3 md:w-4/12 flex flex-col">
        <small className="text-xs font-semibold text-sky-700">
          Berangkat dari
        </small>
        <strong className="mb-3">{myProp.item.departured_location}</strong>
        <small className="text-xs font-semibold text-sky-700">
          Waktu keberangkatan
        </small>
        <strong>{showTime(myProp.item.departured_time)}</strong>
      </div>

      <div className="w-full p-3 md:w-4/12 flex flex-col">
        <small className="text-xs font-semibold text-sky-700">Tiba di</small>
        <strong className="mb-3">{myProp.item.arrived_location}</strong>
        <small className="text-xs font-semibold text-sky-700">
          Waktu kedatangan
        </small>
        <strong>{showTime(myProp.item.arrived_time)}</strong>
      </div>

      <div className="w-full p-3 md:w-4/12 flex flex-col">
        <small className="text-xs font-semibold text-sky-700">
          Unit Kereta
        </small>
        <strong className="mb-3">{myProp.item.train_details.name}</strong>
        <small className="text-xs font-semibold text-sky-700">Harga</small>
        <strong className="mb-3">
          {myProp.item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "IDR",
          })}
        </strong>
      </div>

      <div className="w-full p-3 md:w-4/12 flex flex-col">
        <small className="text-xs font-semibold text-sky-700 mb-1">
          Option
        </small>
        <Link href={`/pelanggan/jadwal/${myProp.item.id}`}>
          <button
            type="button"
            className="w-full md:w-auto px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-md transition duration-200 ease-in-out"
          >
            Pesan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Schedule;
