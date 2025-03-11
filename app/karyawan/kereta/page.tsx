export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../types";
import { axiosInstance } from "@/helper/api";
import Train from "./Train";
import AddKereta from "./addKereta";

// function to get all data kereta
const getKereta = async (): Promise<KeretaType[]> => {
  try {
    // get token from cookie
    const TOKEN = await getServerCookie(`token`);
    const url = `/train`;

    // hit endpoint
    const response: any = await axiosInstance.get(url, {
      headers: { authorization: `Bearer ${TOKEN}` },
    });
    // postman memakai get

    if (response.data.success == true) {
      return response.data.data;
    }
    // = 1 hanya isi data
    // == kalau 2 yang di compare hanya value
    // === jika 3 maka tipe data juga
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const KeretaPage = async () => {
  // call funcition to load "data kereta" from backend

  const dataKereta = await getKereta()
  // menggunkan "await" karena getKereta menggunakan promise
  return (
    <div className="w-full p-5 bg-white">
    <h1 className="text-xl font-bold">Data Kereta</h1>
    <span className="text-sm text-slate-400">Halaman ini memuat data kereta api yang tersedia</span>

    {/* add kereta */}
    <div className="my-3">
      <AddKereta />
    {/* mapping data kereta */}
    {
      dataKereta.map((kereta, index) => (
        <Train item={kereta} key={`kereta-${index}`}/>
      ))
    }
    </div>
    </div>
  )
};

export default KeretaPage;
