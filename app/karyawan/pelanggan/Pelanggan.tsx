"use client"

import Link from "next/link"
import { UserType } from "../types"
import EditPelanggan from "./editPelanggan"
import DeletePelanggan from "./deletePelanggan"
import ResetPelangganPassword from "./resetPasswordPelanggan"

type props = {
    item: UserType
}

const Pelanggan = (myProp: props) => {
    return (
        <div className="w-full flex my-2 border rounded-md bg-blue-100 bg-opacity-45">
          <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">
              Nama Pelanggan
            </small>
            <span>
              <Link href={`/customer/register/${myProp.item.id}`}>
                {myProp.item.name}
              </Link>
            </span>
          </div>
    
          <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">
              Username Pelanggan
            </small>
            <span>{myProp.item.user_details.username}</span>
          </div>
    
          <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">
              NIK Pelanggan
            </small>
            <span>{myProp.item.nik}</span>
          </div>
    
          <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">
              Address Pelanggan
            </small>
            <span>{myProp.item.address}</span>
          </div>
    
          <div className="w-full p-3 md:w-4/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700">
              Phone Pelanggan
            </small>
            <span>{myProp.item.phone}</span>
          </div>
    
          <div className="w-full p-2 md:w-2/12 flex flex-col">
            <small className="text-sm font-semibold text-sky-700 pb-1">
              Option
            </small>
            <div className="flex gap-2 items-center">
              <EditPelanggan pelanggan={myProp.item} />
              <DeletePelanggan pelanggan={myProp.item} />
              <ResetPelangganPassword pelanggan={myProp.item}/>
            </div>
          </div>
        </div>
      );
}

export default Pelanggan