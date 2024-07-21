export function formatCurrency(amount) {
  if (!amount) return '0đ';
  // Kiểm tra nếu amount không phải là số
  if (isNaN(amount)) {
    throw new Error('Invalid amount');
  }

  // Chuyển đổi số sang chuỗi và ngược lại để loại bỏ dấu phẩy ngăn cách hàng nghìn (nếu có)
  const amountStr = Number(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Định dạng chuỗi tiền tệ và trả về
  return `${amountStr}đ`;
}
