export const dynamic = "force-dynamic";
import { axiosInstance } from '@/helper/api'
import { getServerCookie } from '@/helper/server-cookie'
import React from 'react'
import HistoryCard from './_components/historyCard'
import { History } from '@/app/karyawan/types'
import FilterPemesanan from './filterPemesanan'

const getHistory = async (start_date: string, end_date: string): Promise<History[]> => {
    try {
        const url = `/purchase/customer?start_date=${start_date}&end_date=${end_date}`
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

type props = {
    searchParams: Promise<{
        start_date?: string
        end_date?: string
    }>
}

const HistoryPage = async (myProp: props) => {

   
    const start_date = (await myProp.searchParams)?.start_date || ""
    const end_date = (await myProp.searchParams)?.end_date|| ""
    const dataJadwal = await getHistory(start_date, end_date)

  return (
    <div>
        <div className="w-full p-3">
      <div className="bg-sky-700 w-full p-3 rounded-lg shadow-md">
        <h1 className="text-white text-xl font-bold">
          History Pemesanan by Date
        </h1>

        <FilterPemesanan start_date={start_date} end_date={end_date}/>

      </div>

      {
        start_date !== "" &&
        end_date !== "" &&
        <div className="my-3">
            {/* div ini akan tampil jika departured_location dan arrived_location telah diisi (tidak kosong) */}
            {
                dataJadwal.length == 0? 
                <div className="w-full p-3 rounded-md bg-yellow-100">
                    Sorry, jadwal tidak tersedia
                </div> :
                <div>
                    {
                        dataJadwal.map((jadwal, index) => (
                            <HistoryCard item={jadwal} key={`keyJadwal-${index}`}/>
                        ))
                    }
                </div>
            }
        </div>
      }
    </div>
        {/* <h1 className='text-left text-2xl font-bold p-3'>History Pemesanan</h1>
        <div className='flex flex-col p-3'>
            {
                historyData.map((item, index) => (
                    <HistoryCard key={index} item={item}/>
                ))
            }            
        </div> */}
    </div>
  )
}

export default HistoryPage