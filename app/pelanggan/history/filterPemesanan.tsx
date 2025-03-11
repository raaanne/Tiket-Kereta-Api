"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type props = {
    start_date: string
    end_date: string
}

const FilterPemesanan = (myProp: props) => {
    const [start_date, setStartDate] = useState<string>("")
    const [end_date, setEndDate] = useState<string>("")
    const router = useRouter()

    const handleSearch = () => {
        if (start_date !== "" && end_date !== "") {
          router.push(
            `/pelanggan/history?start_date=${start_date}&end_date=${end_date}`
          );
        }
        // ? pada url untuk query params
      };

      useEffect(() => {
        setStartDate(myProp.start_date);
        setEndDate(myProp.end_date);
      }, [myProp]);
    
      return (
        <div className="my-4 flex flex-wrap items-center w-full">
      <div className="w-full md:w-1/2 p-3">
        <strong className="font-semibold text-white">Tanggal Awal</strong>{" "}
        <br />
        <input
          type="date"
          id={`start_date`}
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded-bl-lg rounded-br-lg rounded-tr-lg"
        />
      </div>

      <div className="w-full md:w-1/2 p-3">
        <strong className="font-semibold text-white">Tanggal Akhir</strong>{" "}
        <br />
        <input
          type="date"
          id={`end_date`}
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
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
          Filter
        </button>
      </div>
    </div>
      )
}

export default FilterPemesanan