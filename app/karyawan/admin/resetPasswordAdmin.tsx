"use client";

import { FormEvent, useState } from "react";
import { UserType } from "../types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/helper/client-cookie";
import { axiosInstance } from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/Modal";

type props = {
  admin: UserType;
};

const ResetAdminPassword = (myProp: props) => {
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setShow(true);
    setPassword("");
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const TOKEN = getCookie(`token`);
      const url = `/employee/${myProp.admin.id}`;
      const requestData = { password };

      //    hit endpoint to add kereta
      const response: any = await axiosInstance.put(url, requestData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const message = response.data.message;
      if (response.data.success == true) {
        toast(message, {
          containerId: `toastEditAdminPassword-${myProp.admin.id}`,
          type: "success",
        });
        setShow(false);
        // reload page
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(message, {
          containerId: `toastEditAdminPassword-${myProp.admin.id}`,
          type: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        containerId: `toastEditAdminPassword-${myProp.admin.id}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        containerId={`toastEditAdminPassword-${myProp.admin.id}`}
      />
      <button
        type="button"
        className="px-2 py-1 rounded-md bg-yellow-500 hover:bg-yellow-400 text-white"
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
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>

      <Modal isShow={show}>
        {/* modal header */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-3 rounded-t-lg">
            {/* rounded t adalah border top */}
            <h1 className="font-bold text-lg">Reset Password Karyawan</h1>
            <span className="text-sm text-slate-400">
              Pastikan data yang diisi benar
            </span>
          </div>

          {/* modal body */}
          <div className="w-full p-3">
            <div className="my-2 border rounded-md p3">
              <small className="text-sm font-semibold text-sky-700">
                Password Karyawan
              </small>
              <input
                type="text"
                id={`password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                className="w-full p-1 outline-none focus:border-b-sky-700 focus:border-b"
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

export default ResetAdminPassword;
