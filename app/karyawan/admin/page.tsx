export const dynamic = "force-dynamic";

import { getServerCookie } from "@/helper/server-cookie";
import { UserType } from "../types";
import { axiosInstance } from "@/helper/api";
import AddAdmin from "./addAdmin";
import Admin from "./Admin";

const getAdmin = async (): Promise<UserType[]> => {
  try {
    // Ambil token dari cookie
    const TOKEN = await getServerCookie("token");
    const url = "/employee";

    // Panggil API
    const response = await axiosInstance.get(url, {
      headers: { authorization: `Bearer ${TOKEN}` },
    });

    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return [];
  }
};

const AdminPage = async () => {
  const dataAdmin = await getAdmin();

  return (
    <div className="w-full p-5 bg-white">
      <h1 className="text-xl font-bold">Data Karyawan</h1>
      <p>Halaman ini memuat data karyawan yang tersedia.</p>

      {/* Form tambah admin */}
      <div className="my-3">
        <AddAdmin />
      </div>

      {/* Daftar Admin */}
      <div className="space-y-3">
        {dataAdmin.length > 0 ? (
          dataAdmin.map((admin, index) => <Admin item={admin} key={`admin-${index}`} />)
        ) : (
          <p className="text-gray-500">Tidak ada data karyawan tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
