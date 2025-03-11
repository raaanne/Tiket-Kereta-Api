"use client"

import Link from "next/link"
import { KeretaType } from "../types"
import DeleteKereta from "./deleteKereta"
import EditKereta from "./editKereta"

type props = {
    item: KeretaType 
}
const Train = (myProp: props) => {
    return(
        <div className="w-full flex flex-wrap my-2 border rounded-md bg-blue-100 bg-opacity-45">
            <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">Nama Kereta</small>
            <span>
                <Link href={`/karyawan/kereta/${myProp.item.id}`}>
                    {myProp.item.name}
                </Link>
            </span>
            </div>

            <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">Deskripsi Kereta</small>
            <span>{myProp.item.descriptions}</span>
            </div>

            <div className="w-full p-3 md:w-2/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">Tipe Kereta</small>
            <span>{myProp.item.type}</span>
            </div>

            <div className="w-full p-2 md:w-2/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700 pb-1">Option</small>
            <div className="flex gap-2 items-center">
                <EditKereta kereta={myProp.item}/> 
                <DeleteKereta kereta={myProp.item}/>
            </div>
            </div>
        </div>
    )
}

export default Train