import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import JudgeApi from "~/api-requests/judge.requests";
import Loading from "~/components/Loading";
import WelcomePartition from "~/components/WelcomePartition";
import BadgeLeader from "~/components/BadgeLeader";
import { Button } from "~/components/ui/button";
import { Sparkles, ArrowLeft, FileText, Link as LinkIcon, Clock } from "lucide-react";
import Helper from "~/utils/helper";

const RoomDetail = () => {
    const { roomId } = useParams<{ roomId: string }>();

    const { data: team, isLoading } = useQuery({
        queryKey: ["judge", "room", roomId],
        queryFn: async () => {
            const res = await JudgeApi.getTeamsByRoom(roomId!);
            return res.result;
        },
        enabled: !!roomId,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (!team) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500">Không tìm thấy thông tin nhóm</p>
                <Link to="/judge" className="mt-4">
                    <Button variant="outline">Quay lại</Button>
                </Link>
            </div>
        );
    }

    const candidates = team?.candidates || [];
    const leader = team?.leader;
    const latestSubmission = team?.submissions?.[0];

    return (
        <>
            <section className="mb-6 sm:mb-8">
                <WelcomePartition />
            </section>

            <section className="mb-4">
                <Link to="/judge">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-all hover:shadow-md"
                    >
                        <ArrowLeft size={16} />
                        <span>Quay lại danh sách phòng</span>
                    </Button>
                </Link>
            </section>

            {latestSubmission && (
                <section className="mb-6" id="submission">
                    <div className="overflow-hidden rounded-lg border border-blue-200/70 bg-blue-50/30 shadow-xs">
                        <div className="border-b border-blue-200/70 bg-gradient-to-r from-blue-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                            <div className="flex items-center gap-2">
                                <FileText size={20} className="text-blue-600" />
                                <h3 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                    Sản phẩm nộp gần nhất
                                </h3>
                            </div>
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                                <Clock size={14} />
                                <span>
                                    Nộp bởi <span className="font-semibold">{latestSubmission.user.fullName}</span> -{" "}
                                    {Helper.timeAgo(latestSubmission.submittedAt)}
                                </span>
                            </p>
                        </div>
                        <div className="px-5 py-4 sm:px-6 sm:py-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                                        Slide thuyết trình
                                    </p>
                                    <a
                                        href={latestSubmission.slideLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm break-all text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        <LinkIcon size={14} />
                                        <span className="truncate">{latestSubmission.slideLink}</span>
                                    </a>
                                </div>
                                <div>
                                    <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                                        Bảng phân công
                                    </p>
                                    <a
                                        href={latestSubmission.taskAssignmentLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm break-all text-blue-600 hover:text-blue-700 hover:underline"
                                    >
                                        <LinkIcon size={14} />
                                        <span className="truncate">{latestSubmission.taskAssignmentLink}</span>
                                    </a>
                                </div>
                            </div>
                            {latestSubmission.productLinks && latestSubmission.productLinks.length > 0 && (
                                <div className="mt-4">
                                    <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                                        Link sản phẩm
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {latestSubmission.productLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-600 transition-colors hover:border-blue-300 hover:text-blue-700"
                                            >
                                                <LinkIcon size={14} />
                                                <span>Sản phẩm {index + 1}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {latestSubmission.note && (
                                <div className="mt-4">
                                    <p className="mb-2 text-xs font-medium tracking-wide text-gray-600 uppercase">
                                        Ghi chú
                                    </p>
                                    <p className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                                        {latestSubmission.note}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <section className="col-span-16" id="team-detail">
                <div className="overflow-hidden rounded-lg border border-gray-200/70 bg-white shadow-xs transition-all">
                    <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6 sm:py-5">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
                                        [NHÓM <span className="text-primary font-bold">{team.group}</span>] -{" "}
                                        {team.name ? (
                                            <span className="text-primary font-bold">{team.name}</span>
                                        ) : (
                                            <span className="text-gray-500">Chưa đặt tên nhóm</span>
                                        )}
                                    </h2>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                                    <span className="font-semibold">Đề tài:</span> {team.topic.title}
                                </p>
                                <p className="mt-0.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                                    Danh sách thành viên trong nhóm để chấm điểm.
                                </p>
                            </div>
                        </div>
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
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:table-cell sm:px-6 sm:py-3.5">
                                        MSSV
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5 md:table-cell">
                                        Liên hệ
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                {candidates.map((candidate, index) => {
                                    const isLeader = candidate.id === leader?.id;
                                    return (
                                        <tr key={candidate.id} className="transition-colors hover:bg-gray-50/50">
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
                                                <p className="mt-0.5 text-xs text-gray-600">Ngành: {candidate.major}</p>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:table-cell sm:px-6 sm:py-4">
                                                <p className="text-blue-gray-900 text-sm font-semibold">
                                                    {candidate.studentCode}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4 md:table-cell">
                                                <div className="space-y-1">
                                                    <p className="text-xs">
                                                        <span className="font-medium">Email:</span>{" "}
                                                        {candidate.user.email}
                                                    </p>
                                                    <p className="text-xs">
                                                        <span className="font-medium">SĐT:</span> {candidate.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                <Link to={`/judge/barem/${candidate.id}`}>
                                                    <Button
                                                        variant="outline"
                                                        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 shadow-sm transition-all hover:shadow-md"
                                                    >
                                                        <span>Đánh giá</span>
                                                        <Sparkles size={16} />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RoomDetail;
