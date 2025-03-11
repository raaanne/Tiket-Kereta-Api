export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie";
import { UserType } from "../types";
import { axiosInstance } from "@/helper/api";
import AddPelanggan from "./addPelanggan";
import Pelanggan from "./Pelanggan";

const getPelanggan = async (): Promise<UserType[]> => {
    try {
        // get token from cookie
        const TOKEN = await getServerCookie(`token`);
        const url = `/customer`;
    
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
}

const PelangganPage = async () => {
    const dataPelanggan = await getPelanggan()
    return (
        <div className="w-full p-5 bg-white">
          <h1 className="text-xl font-bold">Data Karyawan</h1>
          <span>Halaman ini memuat data karyawan yang tersedia</span>
    
          {/* add admin */}
          <div className="my-3">
            <AddPelanggan />
    
            {/* Mapping */}
            {dataPelanggan.map((pelanggan, index) => (
              <Pelanggan item={pelanggan} key={`pelanggan-${index}`} />
            ))}
          </div>
        </div>
      );
}

export default PelangganPage