"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type props = {
  departuredLocation: string;
  arrivedLocation: string;
};
const FilterJadwal = (myProp: props) => {
  const [departured_location, setDeparturedLocation] = useState<string>("");
  const [arrived_location, setArrivedLocation] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (departured_location !== "" && arrived_location !== "") {
      router.push(
        `/pelanggan/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`
      );
    }
    // ? pada url untuk query params
  };

  // Digunakan untuk update data saat komponen ini di muat ulang
  useEffect(() => {
    setDeparturedLocation(myProp.departuredLocation);
    setArrivedLocation(myProp.arrivedLocation);
  }, [myProp]);

  return (
    <div className="my-4 flex flex-wrap items-center w-full">
      <div className="w-full md:w-1/2 p-3">
        <strong className="font-semibold text-white">Stasiun Asal</strong>{" "}
        <br />
        <input
          type="text"
          id={`departured_location`}
          value={departured_location}
          onChange={(e) => setDeparturedLocation(e.target.value)}
          className="w-full border p-2 rounded-bl-lg rounded-br-lg rounded-tr-lg"
        />
      </div>

      <div className="w-full md:w-1/2 p-3">
        <strong className="font-semibold text-white">Stasiun Tujuan</strong>{" "}
        <br />
        <input
          type="text"
          id={`arrived_location`}
          value={arrived_location}
          onChange={(e) => setArrivedLocation(e.target.value)}
          className="w-full border p-2 rounded-bl-lg rounded-br-lg rounded-tr-lg"
        />
      </div>

      <div className="ml-3 mt-2">
        <button
          type="button"
          onClick={() => handleSearch()}
          className="px-4 py-2 rounded-md bg-white hover:bg-blue-100 text-sky-700 text-sm font-semibold flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          Search
        </button>
      </div>

      <div className="ml-3 mt-2">
        <Link href="/pelanggan/history">
        <button
          type="button"
          onClick={() => handleSearch()}
          className="px-4 py-2 rounded-md bg-white hover:bg-blue-100 text-sky-700 text-sm font-semibold flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          Filter Pemesanan
        </button>
        </Link>
      </div>
    </div>
  );
};

export default FilterJadwal;
