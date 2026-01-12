import React, { useState } from "react";
import { Calendar, Clock, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

interface TimeSlots {
    [date: string]: string[];
}

// Thời gian thuyết trình thử - mỗi ngày 4 slot
const trialTimeSlots: TimeSlots = {
    "17/01/2026": ["7:00 - 7:45", "8:00 - 8:45", "9:00 - 9:45", "10:00 - 10:45"],
    "18/01/2026": ["7:00 - 7:45", "8:00 - 8:45", "9:00 - 9:45", "10:00 - 10:45"],
    "19/01/2026": ["7:00 - 7:45", "8:00 - 8:45", "9:00 - 9:45", "10:00 - 10:45"],
    "20/01/2026": ["7:00 - 7:45", "8:00 - 8:45", "9:00 - 9:45", "10:00 - 10:45"],
};

// Thời gian thuyết trình chính thức - mỗi ngày 2 slot
const officialTimeSlots: TimeSlots = {
    "17/01/2026": ["13:00 - 13:45", "14:00 - 14:45"],
    "18/01/2026": ["13:00 - 13:45", "14:00 - 14:45"],
    "19/01/2026": ["13:00 - 13:45", "14:00 - 14:45"],
    "20/01/2026": ["13:00 - 13:45", "14:00 - 14:45"],
};

const FormRegisterPresent = () => {
    const [trialSlot, setTrialSlot] = useState<string>("");
    const [officialSlots, setOfficialSlots] = useState<string[]>([]);

    const handleOfficialSlotChange = (slot: string) => {
        setOfficialSlots((prev) => {
            if (prev.includes(slot)) {
                return prev.filter((s) => s !== slot);
            }
            return [...prev, slot];
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            trialSlot,
            officialSlots,
        });
        // TODO: Implement API call
    };

    return (
        <section className="mb-6 overflow-hidden rounded-md border bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                    Đăng ký thời gian thuyết trình
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Vui lòng chọn thời gian phù hợp cho buổi thuyết trình thử và thuyết trình chính thức.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                {/* Trial Presentation */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <h3 className="text-base font-semibold text-gray-900">
                            Thời gian thuyết trình thử
                            <span className="ml-2 text-xs font-normal text-gray-500">(Không bắt buộc)</span>
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Chọn <span className="font-semibold">MỘT</span> khung giờ để thuyết trình thử nghiệm và nhận
                        phản hồi
                    </p>

                    <RadioGroup value={trialSlot} onValueChange={setTrialSlot}>
                        {Object.entries(trialTimeSlots).map(([date, slots]) => (
                            <div key={`trial-${date}`} className="mb-5 space-y-3">
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-700">{date}</span>
                                </div>
                                <div className="grid gap-2 pl-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {slots.map((slot) => (
                                        <div key={`trial-${date}-${slot}`} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={`${date}|${slot}`}
                                                id={`trial-${date}-${slot}`}
                                                className="text-blue-600"
                                            />
                                            <Label
                                                htmlFor={`trial-${date}-${slot}`}
                                                className="cursor-pointer text-sm font-normal text-gray-700 hover:text-gray-900"
                                            >
                                                {slot}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Official Presentation */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-green-600" />
                        <h3 className="text-base font-semibold text-green-700">
                            Thời gian thuyết trình chính thức
                            <span className="text-red-500">*</span>
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Chọn <span className="font-semibold text-green-700">NHIỀU</span> khung giờ bạn có thể tham gia
                        thuyết trình chính thức
                    </p>

                    <div className="space-y-4">
                        {Object.entries(officialTimeSlots).map(([date, slots]) => (
                            <div key={`official-${date}`} className="space-y-3">
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-700">{date}</span>
                                </div>
                                <div className="grid gap-3 pl-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {slots.map((slot) => (
                                        <div key={`official-${date}-${slot}`} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`official-${date}-${slot}`}
                                                checked={officialSlots.includes(`${date}|${slot}`)}
                                                onCheckedChange={() => handleOfficialSlotChange(`${date}|${slot}`)}
                                            />
                                            <Label
                                                htmlFor={`official-${date}-${slot}`}
                                                className="cursor-pointer text-sm font-normal text-gray-700 hover:text-gray-900"
                                            >
                                                {slot}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-3 border-t border-gray-200/70 pt-5">
                    <Button
                        type="submit"
                        className="group flex items-center gap-2 transition-all hover:shadow-md"
                        disabled={officialSlots.length === 0}
                    >
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        Đăng ký
                    </Button>
                    <p className="text-xs text-gray-500">
                        <span className="font-semibold text-red-600">Lưu ý:</span> Bạn phải chọn ít nhất 1 khung giờ cho
                        thuyết trình chính thức
                    </p>
                </div>
            </form>
        </section>
    );
};

export default FormRegisterPresent;
