import request from "@/configs/request";

export const getPaymentUrl = async (billId) => {
    try {
        const response = await request.get(`/pay/${billId}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};
