import { Modal, Radio, Button, notification } from "antd";
import React, { useState, useEffect } from "react";

const selectedEnum = {
    POINTS: 0,
    VOUCHER: 1,
};

function ModalCancel({ visible, onClose, handleCancelBill }) {
    const [selectedOption, setSelectedOption] = useState("points"); // Default to 'points'

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleCancel = () => {
        if (selectedOption) {
            handleCancelBill(
                selectedOption === "points"
                    ? selectedEnum.POINTS
                    : selectedEnum.VOUCHER
            ); // Call the parent handler with selected option
            onClose(); // Close the modal
        } else {
            // Handle case where no option is selected
            notification.error({
                message: "Thông báo",
                description: "Vui lòng chọn phương thức hoàn tiền.",
            });
        }
    };

    // Reset selectedOption when modal opens
    useEffect(() => {
        if (visible) {
            setSelectedOption("points"); // Reset to default value when modal is visible
        }
    }, [visible]);

    return (
        <Modal
            title='Chọn phương thức hoàn tiền'
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key='cancel' onClick={onClose}>
                    Hủy
                </Button>,
                <Button key='submit' type='primary' onClick={handleCancel}>
                    Xác nhận
                </Button>,
            ]}
        >
            <Radio.Group onChange={handleRadioChange} value={selectedOption}>
                <Radio value='points' className='text-[16px] mb-2'>
                    Hoàn lại bằng điểm thưởng
                </Radio>
                <Radio value='voucher' className='text-[16px]'>
                    Hoàn voucher bằng giá trị vé
                </Radio>
            </Radio.Group>
        </Modal>
    );
}

export default ModalCancel;
