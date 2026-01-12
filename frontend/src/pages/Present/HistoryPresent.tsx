import React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";

interface Registration {
    id: string;
    trialSlot: {
        date: string;
        time: string;
    };
    officialSlots: {
        date: string;
        time: string;
    }[];
    status: "pending" | "approved" | "rejected";
    createdAt: string;
}

const HistoryPresent = () => {
    // TODO: Replace with actual data from API
    const registrations: Registration[] = [];

    if (registrations.length === 0) {
        return (
            <section className="overflow-hidden rounded-md border bg-white">
                <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                    <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Lịch sử đăng ký</h2>
                </div>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-gray-100 p-3">
                        <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-gray-900">Chưa có đăng ký nào</h3>
                    <p className="mt-2 text-sm text-gray-500">Bạn chưa đăng ký thời gian thuyết trình nào.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-md border bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Lịch sử đăng ký</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Xem lại các lần đăng ký thời gian thuyết trình của bạn
                </p>
            </div>

            <div className="divide-y divide-gray-200">
                {registrations.map((registration) => (
                    <div key={registration.id} className="p-5 sm:p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            registration.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : registration.status === "rejected"
                                                  ? "bg-red-100 text-red-700"
                                                  : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {registration.status === "approved"
                                            ? "Đã duyệt"
                                            : registration.status === "rejected"
                                              ? "Từ chối"
                                              : "Đang chờ"}
                                    </span>
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">
                                Đăng ký lúc: {new Date(registration.createdAt).toLocaleString("vi-VN")}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    Thuyết trình thử
                                </h4>
                                <div className="ml-6 flex items-center gap-2 text-sm text-gray-700">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    <span>{registration.trialSlot.date}</span>
                                    <span className="text-gray-400">•</span>
                                    <span>{registration.trialSlot.time}</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                    <Clock className="h-4 w-4 text-green-500" />
                                    Thuyết trình chính thức
                                </h4>
                                <div className="ml-6 space-y-1.5">
                                    {registration.officialSlots.map((slot, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            <span>{slot.date}</span>
                                            <span className="text-gray-400">•</span>
                                            <span>{slot.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HistoryPresent;
