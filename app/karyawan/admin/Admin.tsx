"use client";

import Link from "next/link";
import { UserType } from "../types";
import EditAdmin from "./editAdmin";
import DeleteAdmin from "./deleteAdmin";
import ResetAdminPassword from "./resetPasswordAdmin";

type props = {
  item: UserType;
};

const Admin = (myProp: props) => {
  return (
    <div className="w-full grid grid-cols-6 my-2 border rounded-md bg-gradient-to-r from-sky-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
      {/* Name */}
      <div className="p-3 flex flex-col justify-center">
        <small className="text-xs font-semibold text-sky-700">
          Nama Karyawan
        </small>
        <span className="font-medium truncate">
          <Link href={`/employee/register/${myProp.item.id}`} className="hover:text-sky-600 hover:underline">
            {myProp.item.name}
          </Link>
        </span>
      </div>

      {/* Username */}
      <div className="p-3 flex flex-col justify-center">
        <small className="text-xs font-semibold text-sky-700">
          Username
        </small>
        <span className="truncate">
          {myProp.item.user_details.username}
        </span>
      </div>

      {/* NIK */}
      <div className="p-3 flex flex-col justify-center">
        <small className="text-xs font-semibold text-sky-700">
          NIK
        </small>
        <span className="truncate">
          {myProp.item.nik}
        </span>
      </div>

      {/* Address */}
      <div className="p-3 flex flex-col justify-center">
        <small className="text-xs font-semibold text-sky-700">
          Address
        </small>
        <span className="truncate">
          {myProp.item.address}
        </span>
      </div>

      {/* Phone */}
      <div className="p-3 flex flex-col justify-center">
        <small className="text-xs font-semibold text-sky-700">
          Phone
        </small>
        <span className="truncate">
          {myProp.item.phone}
        </span>
      </div>

      {/* Options */}
      <div className="p-3 flex flex-col justify-center">
        <small className="text-xs font-semibold text-sky-700 mb-1">
          Option
        </small>
        <div className="flex gap-1 items-center">
          <EditAdmin admin={myProp.item} />
          <DeleteAdmin admin={myProp.item} />
          <ResetAdminPassword admin={myProp.item} />
        </div>
      </div>
    </div>
  );
};

export default Admin;