import React from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

const Notification = () => {
    // TODO: Replace with actual notification data from API/store
    const hasRegistered = false; // Example state
    const registrationStatus = "pending"; // 'pending' | 'approved' | 'rejected'

    if (hasRegistered) {
        return (
            <div className="mb-6 overflow-hidden rounded-md border border-blue-200 bg-blue-50">
                <div className="flex gap-3 p-4">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-blue-900">Đã đăng ký thành công</h3>
                        <p className="mt-1 text-sm text-blue-700">
                            Bạn đã đăng ký thời gian thuyết trình. Ban tổ chức sẽ xác nhận và thông báo lại cho bạn.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6 overflow-hidden rounded-md border border-amber-200 bg-amber-50">
            <div className="flex gap-3 p-4">
                <Info className="h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-amber-900">Hướng dẫn đăng ký</h3>
                    <ul className="mt-2 space-y-1 text-sm text-amber-700">
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
                            <span>
                                <strong>Thuyết trình thử:</strong> Chọn 1 khung giờ để thử nghiệm và nhận phản hồi từ
                                mentor
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
                            <span>
                                <strong>Thuyết trình chính thức:</strong> Chọn nhiều khung giờ bạn có thể tham gia, BTC
                                sẽ sắp xếp cụ thể
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
                            <span>Mỗi slot thuyết trình kéo dài tối đa 45 phút</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
                            <span>Vui lòng đăng ký trước thời hạn để đảm bảo có slot phù hợp</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notification;
