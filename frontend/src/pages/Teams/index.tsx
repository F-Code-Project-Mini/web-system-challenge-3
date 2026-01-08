import { BookOpen, User, Calendar, Clock } from "lucide-react";
import BadgeLeader from "~/components/BadgeLeader";
import { useQuery } from "@tanstack/react-query";
import TeamApi from "~/api-requests/team.requests";
import Loading from "~/components/Loading";

const TeamPage = () => {
    const { data: teams, isLoading } = useQuery({
        queryKey: ["teams"],
        queryFn: async () => {
            const res = await TeamApi.getAllTeams();
            return res.result;
        },
    });
    if (isLoading) <Loading />;

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Danh sách các nhóm</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Xem thông tin các nhóm tham gia Challenge vòng 3. Tổng cộng:{" "}
                    <span className="text-primary font-semibold">{teams?.length || 0}</span> nhóm
                </p>
            </section>

            <section className="space-y-8">
                {teams?.map((team, index) => (
                    <>
                        {index > 0 && <div className="border-t border-gray-200/50" />}
                        <div key={team.id} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-2">
                            <div className="col-span-1 lg:col-span-8">
                                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                                        <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                            [NHÓM <span className="text-primary font-bold">{team?.group}</span>] -{" "}
                                            {team?.name ? (
                                                <span className="text-primary font-bold">{team.name}</span>
                                            ) : (
                                                <span className="text-red-500">Chưa đặt tên nhóm</span>
                                            )}
                                        </h2>
                                    </div>
                                    <div className="overflow-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50/50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                        STT
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                        Họ và tên
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                        MSSV
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                                        Ngành
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                                {team.candidates?.map((candidate, index) => {
                                                    const isLeader = candidate.id === team.leaderId;
                                                    return (
                                                        <tr
                                                            key={candidate.id}
                                                            className="transition-colors hover:bg-gray-50/50"
                                                        >
                                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 sm:py-4">
                                                                {index + 1}
                                                            </td>
                                                            <td
                                                                className={`${isLeader ? "font-semibold text-gray-900" : "text-gray-700"} px-4 py-3.5 text-sm whitespace-nowrap sm:px-6 sm:py-4`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {candidate.user.fullName}
                                                                    {isLeader && <BadgeLeader />}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4">
                                                                <p className="text-sm font-semibold text-gray-900">
                                                                    {candidate.studentCode}
                                                                </p>
                                                            </td>
                                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                                <p className="text-sm text-gray-900">
                                                                    {candidate.major}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 space-y-2 lg:col-span-4">
                                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                                    <div className="border-b border-gray-200/70 bg-gradient-to-br from-gray-50/80 to-white px-5 py-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                            <BookOpen className="text-primary h-4 w-4" />
                                            Thông tin nhóm
                                        </h3>
                                    </div>
                                    <div className="space-y-3 px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                                                <BookOpen className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium text-gray-500">Đề tài</p>
                                                <p className="text-primary mt-0.5 text-sm leading-relaxed font-semibold">
                                                    {team.topic?.title || "Chưa có đề tài"}
                                                </p>
                                                {team.topic?.filePath && (
                                                    <a
                                                        href={team.topic.filePath}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary mt-1 inline-block text-xs font-medium hover:underline"
                                                    >
                                                        Xem chi tiết đề tài →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary/10 text-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium text-gray-500">Mentor</p>
                                                <p className="text-primary mt-0.5 text-sm font-semibold">
                                                    {team.mentorship?.mentor?.fullName || "Chưa có mentor"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-hidden rounded-lg border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white shadow-xs transition-all">
                                    <div className="border-b border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white px-5 py-4">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                            <Calendar className="h-4 w-4 text-amber-600" />
                                            Lịch thuyết trình
                                        </h3>
                                    </div>
                                    <div className="space-y-3 px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium text-gray-500">Ngày</p>
                                                <p className="mt-0.5 text-xs font-semibold text-gray-900 italic">
                                                    Chưa mở
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                                                <Clock className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium text-gray-500">Giờ</p>
                                                <p className="mt-0.5 text-xs font-semibold text-gray-900 italic">
                                                    Chưa mở
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                                                <BookOpen className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-medium text-gray-500">Địa điểm</p>
                                                <p className="mt-0.5 text-xs font-semibold text-gray-900 italic">
                                                    Chưa mở
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </section>
        </>
    );
};

export default TeamPage;
