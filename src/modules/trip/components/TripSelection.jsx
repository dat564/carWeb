import SeatBooked from '@/components/icons/seat/SeatBooked';
import SeatChecked from '@/components/icons/seat/SeatChecked';
import SeatDriver from '@/components/icons/seat/SeatDriver';
import SeatEmpty from '@/components/icons/seat/SeatEmpty';
import { TicketStatus } from '@/constants/status';
const ticket = 11;

const TripSelection = ({ seatSelected, handleSelectSeat, tickets }) => {
  return (
    <div className="flex justify-center gap-40 py-5 ">
      <div>
        <h3 className="mb-5">Chú thích</h3>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-5">
            <SeatBooked />
            <span>Ghế không bán</span>
          </li>
          <li className="flex items-center gap-5">
            <SeatChecked />
            <span>Đang chọn</span>
          </li>
          <li className="flex items-center gap-5">
            <SeatEmpty />
            <span>Còn trống</span>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex flex-wrap justify-between gap-2 p-5 bg-gray-200 rounded-lg w-44">
          <div>
            <SeatDriver />
          </div>
          {tickets.map((ticket, index) => {
            const isReady = ticket.status === TicketStatus.EMPTY;
            const length = tickets.length;
            return (
              <div
                key={index}
                className={`cursor-pointer ${index < length - 4 && index % 2 === 0 && index !== 0 ? 'mr-5' : ''}`}
                onClick={() => handleSelectSeat(index)}
              >
                {seatSelected?.includes(index) ? <SeatChecked /> : isReady ? <SeatEmpty /> : <SeatBooked />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TripSelection;
