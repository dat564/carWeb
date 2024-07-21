import React from 'react';

const LisenceTab = () => {
  return (
    <div>
      <h1>Chính sách nhà xe</h1>
      <div className="p-4">
        <h2>Yêu cầu khi lên xe</h2>
        <ul className="pt-2 pl-4">
          <li>➡️ Có mặt tại văn phòng/quầy vé/bến xe trước 30 phút để làm thủ tục lên xe</li>
          <li>➡️ Đổi vé giấy trước khi lên xe</li>
          <li>➡️ Xuất trình SMS/Email đặt vé trước khi lên xe</li>
          <li>➡️ Không mang đồ ăn, thức ăn có mùi lên xe</li>
          <li>➡️ Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe</li>
          <li>➡️ Không mang các vật dễ cháy nổ lên xe</li>
          <li>➡️ Không vứt rác trên xe</li>
          <li>➡️ Không làm ồn, gây mất trật tự trên xe</li>
        </ul>
      </div>
      <hr />
      <div className="p-4">
        <h2>Hành lý xách tay</h2>
        <ul className="pt-2 pl-4">
          <li>➡️ Tổng trọng lượng hành lý không vượt quá 10 kg</li>
          <li>➡️ Không vận chuyển hàng hóa cồng kềnh</li>
        </ul>
      </div>
      <hr />
      <div className="p-4">
        <h2>Gửi xe đạp/xe máy</h2>
        <ul className="pt-2 pl-4">
          <li>➡️ Nhà xe không nhận gửi kèm xe đạp/xe máy.</li>
        </ul>
      </div>
    </div>
  );
};

export default LisenceTab;
