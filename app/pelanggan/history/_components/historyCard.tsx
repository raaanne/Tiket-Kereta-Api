import { Purchases, ScheduleType } from "@/app/karyawan/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useMemo } from "react";

// Types
interface History {
  id: number;
  purchase_date: string;
  customer_id: number;
  schedule_id: number;
  app_user_token: string;
  createdAt: string;
  updatedAt: string;
  purchases_details: Purchases[];
  schedule_details: ScheduleType;
}

// Helper functions
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy, HH:mm", { locale: id });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

// Sub-components
const InfoSection: React.FC<{
  title: string;
  content: string;
  subContent?: string;
  icon?: React.ReactNode;
}> = ({ title, content, subContent, icon }) => (
  <div className="mb-4 p-3 bg-sky-50 rounded-md border-l-4 border-sky-500">
    <div className="flex items-center gap-2 font-bold text-sky-800 text-lg mb-1">
      {icon}
      {title}
    </div>
    <div className="text-gray-800 font-medium">{content}</div>
    {subContent && <div className="text-gray-600 text-sm mt-1">{subContent}</div>}
  </div>
);

const PassengerTableHeader: React.FC = () => (
  <tr>
    <th className="px-6 py-3 text-left text-xs font-semibold text-sky-800 uppercase tracking-wider border-b-2 border-sky-500">
      Nama
    </th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-sky-800 uppercase tracking-wider border-b-2 border-sky-500">
      NIK
    </th>
    <th className="px-6 py-3 text-left text-xs font-semibold text-sky-800 uppercase tracking-wider border-b-2 border-sky-500">
      Nomor Kursi
    </th>
  </tr>
);

const PassengerTableRow: React.FC<{ passenger: Purchases; index: number }> = ({ passenger, index }) => (
  <tr className={`${index % 2 === 0 ? "bg-white" : "bg-sky-50"} hover:bg-sky-100 transition-colors duration-150`}>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
      {passenger.passanger_name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
      {passenger.passanger_id}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm bg-sky-100 text-sky-700 font-semibold rounded-md text-center w-24">
      {passenger.seat_number}
    </td>
  </tr>
);

const PassengerList: React.FC<{ passengers: Purchases[] }> = ({ passengers }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-sky-700 mb-3 pb-2 border-b border-gray-200">
      Daftar Penumpang ({passengers.length})
    </h2>
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-sky-50 to-white">
          <PassengerTableHeader />
        </thead>
        <tbody>
          {passengers.map((passenger, index) => (
            <PassengerTableRow key={index} passenger={passenger} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Main component
const HistoryCard: React.FC<{ item: History }> = ({ item }) => {
  const { purchase_date, schedule_details, purchases_details } = item;
  
  const journeyDuration = useMemo(() => {
    try {
      const departure = new Date(schedule_details.departured_time);
      const arrival = new Date(schedule_details.arrived_time);
      const durationMs = arrival.getTime() - departure.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}j ${minutes}m`;
    } catch (error) {
      return `${error}`;
    }
  }, [schedule_details.departured_time, schedule_details.arrived_time]);
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 w-full transition-all mb-5 hover:shadow-lg">
      {/* Card Header */}
      <div className="flex flex-wrap justify-between items-center mb-5 pb-3 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-sky-800">Detail Perjalanan</h1>
        <div className="bg-sky-100 text-sky-800 px-4 py-1 rounded-full text-sm font-semibold">
          Durasi: {journeyDuration}
        </div>
      </div>
      
      {/* Journey Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <InfoSection 
          title="Tanggal Order" 
          content={formatDate(purchase_date)}
        />
        <InfoSection
          title="Stasiun Keberangkatan"
          content={schedule_details.departured_location}
          subContent={formatDate(schedule_details.departured_time)}
        />
        <InfoSection
          title="Stasiun Tujuan"
          content={schedule_details.arrived_location}
          subContent={formatDate(schedule_details.arrived_time)}
        />
        <InfoSection
          title="Nama Kereta"
          content={schedule_details.train_details?.name || "-"}
        />
      </div>

      {/* Passenger List */}
      <PassengerList passengers={purchases_details} />
    </div>
  );
};

export default HistoryCard;