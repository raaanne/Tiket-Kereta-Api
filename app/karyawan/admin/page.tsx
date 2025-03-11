export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie";
import { UserType } from "../types";
import { axiosInstance } from "@/helper/api";
import AddAdmin from "./addAdmin";
import Admin from "./Admin";

const getAdmin = async (): Promise<UserType[]> => {
  try {
    // get token from cookie
    const TOKEN = await getServerCookie(`token`);
    const url = `/employee`;

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

const AdminPage = async () => {
  const dataAdmin = await getAdmin();
  return (
    <div className="w-full p-5 bg-white">
      <h1 className="text-xl font-bold">Data Karyawan</h1>
      <span>Halaman ini memuat data karyawan yang tersedia</span>

      {/* add admin */}
      <div className="my-3">
        <AddAdmin />

        {/* Mapping */}
        {dataAdmin.map((admin, index) => (
          <Admin item={admin} key={`admin-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default AdminPage