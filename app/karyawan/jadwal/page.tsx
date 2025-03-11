export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie"
import { KeretaType, ScheduleType } from "../types"
import { axiosInstance } from "@/helper/api"
import Schedule from "./Schedule"
import AddSchedule from "./addSchedule"


// function to get all data jadwal
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

/** get data jadwal */
const getJadwal = async (): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule`
        const TOKEN = await getServerCookie(`token`)
        // hit endpoint
        const response: any = await axiosInstance
            .get(url, {
                headers: { Authorization: `Bearer ${TOKEN}` }
            })
        if (response.data.success === true)
            return response.data.data
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

const JadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()

    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Jadwal
            </h1>
            <span className="text-sm text-slate-500">
                Halaman ini memuat daftar jadwal kereta yang tersedia
            </span>

            <AddSchedule trains={dataKereta}/>
            <div className="my-3">
                {
                    dataJadwal.map((jadwal, index) => (
                        <Schedule
                            key={`keyJadwal-${index}`}
                            item={jadwal} />
                    ))
                }
            </div>
        </div>
    )
}
export default JadwalPage