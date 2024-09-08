import SeatBooked from "@/components/icons/seat/SeatBooked";
import SeatChecked from "@/components/icons/seat/SeatChecked";
import SeatDriver from "@/components/icons/seat/SeatDriver";
import SeatEmpty from "@/components/icons/seat/SeatEmpty";

const TripSelection = ({ seatSelected, handleSelectSeat }) => {
    const ticket = 11; // Number of seats

    // Function to render the seats dynamically based on the ticket count
    const renderSeats = () => {
        const seats = [];

        for (let index = 0; index < ticket; index++) {
            const isSelected = seatSelected?.includes(index); // Check if the seat is selected

            seats.push(
                <div
                    key={index}
                    className={`cursor-pointer ${
                        index < ticket - 4 && index % 2 === 0 && index !== 0
                            ? "mr-5"
                            : ""
                    }`}
                    onClick={() => handleSelectSeat(index)}
                >
                    {isSelected ? (
                        <SeatChecked />
                    ) : (
                        <SeatEmpty /> // Default to empty if not selected
                    )}
                </div>
            );
        }

        return seats;
    };

    return (
        <div className='flex justify-center gap-40 py-5'>
            <div>
                <h3 className='mb-5'>Chú thích</h3>
                <ul className='flex flex-col gap-3'>
                    <li className='flex items-center gap-5'>
                        <SeatBooked />
                        <span>Ghế không bán</span>
                    </li>
                    <li className='flex items-center gap-5'>
                        <SeatChecked />
                        <span>Đang chọn</span>
                    </li>
                    <li className='flex items-center gap-5'>
                        <SeatEmpty />
                        <span>Còn trống</span>
                    </li>
                </ul>
            </div>
            <div>
                <div className='flex flex-wrap justify-between gap-2 p-5 bg-gray-200 rounded-lg w-44'>
                    <div>
                        <SeatDriver />
                    </div>
                    {renderSeats()}
                </div>
            </div>
        </div>
    );
};

export default TripSelection;
