import moment from 'moment';

export function getTimeFromDatetime(datetimeString) {
  if (!datetimeString) return '';
  const datetime = moment(datetimeString, 'YYYY-MM-DD HH:mm:ss');
  if (!datetime.isValid()) {
    throw new Error('Invalid datetime string');
  }
  const hours = datetime.hour().toString().padStart(2, '0');
  const minutes = datetime.minute().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function subtractDateTimes(datetime1, datetime2) {
  if (!datetime1 || !datetime2) return '';
  const format = 'YYYY-MM-DD HH:mm:ss';

  // Chuyển đổi chuỗi thời gian thành đối tượng moment
  const moment1 = moment(datetime1, format);
  const moment2 = moment(datetime2, format);

  // Kiểm tra tính hợp lệ của thời gian
  if (!moment1.isValid() || !moment2.isValid()) {
    throw new Error('Invalid datetime string');
  }

  // Tính toán sự chênh lệch
  const duration = moment.duration(moment1.diff(moment2));
  const hours = Math.abs(Math.floor(duration.asHours()));
  const minutes = Math.abs(duration.minutes());

  // Tạo chuỗi kết quả
  let result = '';
  if (hours > 0) {
    result += `${hours}h`;
  }
  if (minutes > 0) {
    result += `${minutes}m`;
  }

  // Nếu không có giờ và phút, trả về "0m"
  if (result === '') {
    result = '0m';
  }

  return result;
}

export const formatDate = (dateString) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const dayOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
  return `${dayOfWeek}, ${day}/${month}/${year}`;
};

export const formatTime = (dateTimeString) => {
  if (!dateTimeString) {
    return '...';
  }

  const dateTimeParts = dateTimeString?.split(' ');
  if (dateTimeParts.length !== 2) {
    console.error('Invalid datetime format');
    return 'Invalid time';
  }

  const timePart = dateTimeParts[1];
  const time = new Date(`1970-01-01T${timePart}Z`); // Dùng ngày giả định để tạo đối tượng thời gian

  if (isNaN(time)) {
    console.error('Invalid time format');
    return 'Invalid time';
  }

  const hours = String(time.getUTCHours()).padStart(2, '0');
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const convertDatetimeToServer = (inputStr) => {
  if (!inputStr) return;
  // Sử dụng Moment.js để phân tích chuỗi đầu vào
  var momentObj = moment(inputStr, 'DD/MM/YYYY HH:mm:ss');

  // Trừ 7 giờ từ thời gian
  momentObj.subtract(7, 'hours');

  // Chuyển đổi đối tượng Moment trở lại chuỗi với định dạng mong muốn
  var outputStr = momentObj.format('YYYY-MM-DD HH:mm:ss');

  return outputStr;
};

export function convertDatetime(inputStr) {
  if (!inputStr) return;
  // Sử dụng Moment.js để phân tích chuỗi đầu vào
  var momentObj = moment(inputStr, 'YYYY-MM-DD HH:mm:ss');

  // Thêm 7 giờ vào thời gian
  momentObj.add(7, 'hours');

  return momentObj;
}

export function convertDateAndFormat(inputStr, format = 'DD/MM/YYYY HH:mm:ss') {
  if (!inputStr) return;
  // Sử dụng Moment.js để phân tích chuỗi đầu vào
  var momentObj = moment(inputStr, 'YYYY-MM-DD HH:mm:ss');

  // Thêm 7 giờ vào thời gian
  momentObj.add(7, 'hours');

  return momentObj.format(format);
}

export function convertDatetimeAndFormat(inputStr, format = 'DD/MM/YYYY HH:mm:ss') {
  if (!inputStr) return;
  // Sử dụng Moment.js để phân tích chuỗi đầu vào
  var momentObj = moment(inputStr, 'YYYY-MM-DD HH:mm:ss');

  // Thêm 7 giờ vào thời gian
  momentObj.add(7, 'hours');

  return momentObj.format(format);
}
