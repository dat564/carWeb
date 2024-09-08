import React from "react";

const LisenceTab = () => {
    return (
        <div>
            <h1>Chính sách nhà ga</h1>
            <div className='p-4'>
                <h2>Yêu cầu khi lên ga</h2>
                <ul className='pt-2 pl-4'>
                    <li>
                        ➡️ Có mặt tại văn phòng/quầy vé/bến ga trước 30 phút để
                        làm thủ tục lên ga
                    </li>
                    <li>➡️ Đổi vé giấy trước khi lên ga</li>
                    <li>➡️ Xuất trình SMS/Email đặt vé trước khi lên ga</li>
                    <li>➡️ Không mang đồ ăn, thức ăn có mùi lên ga</li>
                    <li>
                        ➡️ Không hút thuốc, uống rượu, sử dụng chất kích thích
                        trên ga
                    </li>
                    <li>➡️ Không mang các vật dễ cháy nổ lên ga</li>
                    <li>➡️ Không vứt rác trên ga</li>
                    <li>➡️ Không làm ồn, gây mất trật tự trên ga</li>
                </ul>
            </div>
            <hr />
            <div className='p-4'>
                <h2>Hành lý xách tay</h2>
                <ul className='pt-2 pl-4'>
                    <li>➡️ Tổng trọng lượng hành lý không vượt quá 10 kg</li>
                    <li>➡️ Không vận chuyển hàng hóa cồng kềnh</li>
                </ul>
            </div>
            <hr />
            <div className='p-4'>
                <h2>Gửi ga đạp/ga máy</h2>
                <ul className='pt-2 pl-4'>
                    <li>➡️ Nhà ga không nhận gửi kèm ga đạp/ga máy.</li>
                </ul>
            </div>
        </div>
    );
};

export default LisenceTab;
