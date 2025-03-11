import { GerbongType } from "../../types";
import AddSeat from "./addSeat";
import DeleteGerbong from "./deleteGerbong";
import EditGerbong from "./editGerbong";
import Seat from "./Seat";

type props = {
  item: GerbongType;
};

const Gerbong = (myProp: props) => {
  return (
    <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
      <div className="p-3 font-semibold">
        <small className="text-xs text-sky-400">Nama Gerbong</small>
        <br />
        {myProp.item.name}
        <br />
        Jumlah Kursi: {myProp.item.seat_count}
        <div className="w-full my-2 flex flex-wrap gap-3">

          <AddSeat id_wagon={myProp.item.id} />

          {myProp.item.seats.length == 0 ? (
            // jika true
            <div className="w-full bg-red-800 p-5 rounded-md text-white shadow-md">
              Gerbong ini belum memiliki kursi
            </div>
          ) : (
            // jika false
            <div className="flex flex-wrap gap-3">
              {myProp.item.seats.map((seat, index) => (
                <Seat key={`keySeat-${index}`} item={seat} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-3 flex gap-2">
        <EditGerbong item={myProp.item} />
        <DeleteGerbong item={myProp.item} />
      </div>
    </div>
  );
};

export default Gerbong;
