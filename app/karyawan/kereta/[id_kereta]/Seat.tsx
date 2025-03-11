import { SeatType } from "../../types";
import EditSeat from "./editSeat";
import DeleteSeat from "./deleteSeat";

type props = {
  item: SeatType;
};

const Seat = (myProp: props) => {
  return (    
    <div className="size-16 rounded-md flex items-center justify-center flex-col bg-sky-700 shadow-md hover:bg-sky-600">
      <span className="text-white font-bold ">{myProp.item.seat_number}</span>

      <div className="flex gap-1">
      <EditSeat item={myProp.item} />
      <DeleteSeat item={myProp.item} />
      </div>
    </div>
  );
};
export default Seat;
