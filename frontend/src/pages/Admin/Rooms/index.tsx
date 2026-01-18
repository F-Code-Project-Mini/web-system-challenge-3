import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminApi from "~/api-requests/admin.requests";
import Loading from "~/components/Loading";
import AddJudgeDialog from "./AddJudgeDialog";
import { Trash2, Clock, ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import Helper from "~/utils/helper";
import type { AdminRoomType, AdminRoomDetailType } from "~/types/admin.types";
import Notification from "~/utils/notification";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";

const RoomsPage = () => {
    const queryClient = useQueryClient();
    const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

    const { data: rooms, isLoading } = useQuery({
        queryKey: ["admin", "rooms"],
        queryFn: async () => {
            const res = await AdminApi.getAllRooms();
            return res.result;
        },
    });

    const { data: roomDetail, isLoading: isLoadingDetail } = useQuery({
        queryKey: ["admin", "room-detail", expandedRoomId],
        queryFn: async () => {
            if (!expandedRoomId) return null;
            const res = await AdminApi.getRoomDetail(expandedRoomId);
            return res.result;
        },
        enabled: !!expandedRoomId,
    });

    const removeJudgeMutation = useMutation({
        mutationFn: (judgeRoomId: string) => AdminApi.removeJudgeFromRoom(judgeRoomId),
        onSuccess: () => {
            Notification.success({ text: "Xóa judge khỏi phòng thành công!" });
            queryClient.invalidateQueries({ queryKey: ["admin", "rooms"] });
            if (expandedRoomId) {
                queryClient.invalidateQueries({ queryKey: ["admin", "room-detail", expandedRoomId] });
            }
        },
        onError: (error: unknown) => {
            const err = error as { response?: { data?: { message?: string } } };
            Notification.error({ text: err.response?.data?.message || "Có lỗi xảy ra!" });
        },
    });

    const handleRemoveJudge = (judgeName: string, judgeRoomId: string) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa giám khảo "${judgeName}" khỏi phòng chấm này không?`)) {
            removeJudgeMutation.mutate(judgeRoomId);
        }
    };

    const toggleRoom = (roomId: string) => {
        setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
    };

    const getPhaseBadge = (phase: string) => {
        if (phase === "TRIAL") {
            return <Badge className="border-blue-200 bg-blue-100 text-blue-700">Present Thử</Badge>;
        }
        return <Badge className="border-green-200 bg-green-100 text-green-700">Present Thật</Badge>;
    };

    const getModeBadge = (mode: string) => {
        if (mode === "ONLINE") {
            return <Badge className="border-purple-200 bg-purple-100 text-purple-700">Online</Badge>;
        }
        return <Badge className="border-orange-200 bg-orange-100 text-orange-700">Offline</Badge>;
    };

    if (isLoading) return <Loading />;

    return (
        <div className="container mx-auto py-6">
            <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs">
                <div className="border-b border-gray-200/70 bg-gradient-to-r from-teal-50/80 to-cyan-50/50 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Danh sách Phòng Chấm ({rooms?.length || 0})</h2>
                </div>
                <div className="divide-y divide-gray-200/60">
                    {rooms?.map((room: AdminRoomType) => {
                        const isExpanded = expandedRoomId === room.id;
                        const detail = isExpanded ? roomDetail : null;

                        return (
                            <div key={room.id} className="px-5 py-5 hover:bg-gray-50/30">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                Phòng {room.roomNumber}
                                            </h3>
                                            {getPhaseBadge(room.presentPhase)}
                                            {getModeBadge(room.modePresent)}
                                        </div>
                                        {room.team && (
                                            <h4 className="mb-2 text-sm text-gray-700">
                                                [NHÓM <span className="font-semibold">{room.team?.group}</span>] -{" "}
                                                {room.team?.name ? (
                                                    <span className="font-semibold">{room.team.name}</span>
                                                ) : (
                                                    <span className="text-red-500">Chưa đặt tên</span>
                                                )}
                                                {room.team?.topic && (
                                                    <span className="ml-2 text-xs text-gray-500">
                                                        ({room.team.topic.title})
                                                    </span>
                                                )}
                                            </h4>
                                        )}
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>
                                                {Helper.formatDateTime(room.startTime)} -{" "}
                                                {Helper.formatDateTime(room.endTime)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <AddJudgeDialog roomId={room.id} />
                                        <button
                                            onClick={() => toggleRoom(room.id)}
                                            className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            {isExpanded ? (
                                                <>
                                                    <ChevronUp className="h-3.5 w-3.5" />
                                                    Ẩn
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                    Xem giám khảo ({room._count.judgeRooms})
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 rounded-lg border border-gray-200/70 bg-gray-50/30">
                                        {isLoadingDetail ? (
                                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                                Đang tải...
                                            </div>
                                        ) : detail?.judgeRooms.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                                Chưa có giám khảo nào
                                            </div>
                                        ) : (
                                            <div className="overflow-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-100/50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                                STT
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                                Họ và tên
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                                Email
                                                            </th>
                                                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                                Tổng điểm
                                                            </th>
                                                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                                Trạng thái
                                                            </th>
                                                            <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                                Thao tác
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200/60 bg-white">
                                                        {detail?.judgeRooms.map((jr, index) => (
                                                            <tr
                                                                key={jr.id}
                                                                className="transition-colors hover:bg-gray-50/50"
                                                            >
                                                                <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                                    <p className="font-medium">{jr.judge.fullName}</p>
                                                                </td>
                                                                <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                                    {jr.judge.email}
                                                                </td>
                                                                <td className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900 sm:px-6 sm:py-4">
                                                                    {jr.totalScore.toFixed(1)}
                                                                </td>
                                                                <td className="px-4 py-3.5 text-center sm:px-6 sm:py-4">
                                                                    {jr.hasScored ? (
                                                                        <div className="inline-flex items-center gap-1 text-xs text-green-600">
                                                                            <CheckCircle2 className="h-4 w-4" />
                                                                            Đã chấm
                                                                        </div>
                                                                    ) : (
                                                                        <div className="inline-flex items-center gap-1 text-xs text-gray-400">
                                                                            <XCircle className="h-4 w-4" />
                                                                            Chưa chấm
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-3.5 text-center sm:px-6 sm:py-4">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleRemoveJudge(jr.judge.fullName, jr.id)
                                                                        }
                                                                        disabled={removeJudgeMutation.isPending}
                                                                        className="inline-flex items-center justify-center rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                                                                        title="Xóa giám khảo"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoomsPage;
