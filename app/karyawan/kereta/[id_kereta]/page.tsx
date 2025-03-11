export const dynamic = "force-dynamic";
import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../../types";
import { axiosInstance } from "@/helper/api";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";

// functiom to call detail kereta that include gerbong and seat
const getDetailKereta = async (id_kereta: string): Promise<KeretaType | null> => {
    
  try {
    // ketika menampilkan id salah maka dia akan return null atau tidak ada
    // get token from coookie
        const TOKEN = await getServerCookie(`token`);
        const url = `/train/${id_kereta}`;

    // hit endpoint
        const response: any = await axiosInstance.get(url, {
        headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })

        if (response.data.success === true) {
        return response.data.data;
    }
        return null;
  } catch (error) {
        console.log(error);
        return null;
  }
}

type PageProps = {
    params: Promise<{
        id_kereta: string
        // sesuai dengan nama folder
        // dilempar ke file add gerbong untuk mengambil id
    }>
}
const DetailKeretaPage = async ({params}: PageProps) => {
    // get value of selected "id_kereta"
    const myParam = await params;
    const id_kereta = myParam.id_kereta

    // get data from backend
    const dataKereta = await getDetailKereta(id_kereta)

    return(
        <div className="w-full p-3">
            {
                dataKereta === null ? 
                // div untuk false/null
                <div className="bg-yellow-400 rounded-md p-3">
                    <h1 className="text-lg font-bold">Informasi</h1>
                    <p className="text-sm text-slate-500">Data Kereta tidak ditemukan.</p>
                </div> :

                // div untuk true/tidak null
                <div>
                    <h1 className="text-lg font-bold">{dataKereta.name}</h1>
                    <p className="text-md font-medium text-slate-500">{dataKereta.descriptions}</p>

                    <h2 className="text-base font-semibold">Daftar Gerbong</h2>

                    <AddGerbong  id_kereta={Number(id_kereta)}/>
                    <div className="my-5">
                        {
                            dataKereta.wagons.map((gerbong, index) => (
                                <Gerbong item={gerbong}
                                key={`keyGerbong-${index}`}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default DetailKeretaPage
