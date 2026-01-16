import { History, Link as LinkIcon } from "lucide-react";
import Loading from "~/components/Loading";
import Helper from "~/utils/helper";
import type { SubmissionType } from "~/api-requests/judge.requests";

type Props = {
    submissions: SubmissionType[];
    isLoading?: boolean;
};

const HistorySubmit = ({ submissions, isLoading }: Props) => {
    if (isLoading) return <Loading />;

    return (
        <div className="overflow-hidden rounded-md border border-gray-200/70 bg-white">
            <div className="border-b border-gray-200/70 bg-gradient-to-r from-gray-50/80 to-white px-5 py-4 sm:px-6">
                <h2 className="text-base font-semibold tracking-tight text-gray-900 sm:text-lg">Lịch sử nộp bài</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Danh sách các lần nộp bài của nhóm.
                </p>
            </div>

            <div className="overflow-x-auto">
                {!submissions || submissions.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <History className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="mt-4 text-sm font-medium text-gray-900">Chưa có lịch sử nộp bài</p>
                        <p className="mt-1 text-xs text-gray-500">Nhóm chưa nộp bài lần nào</p>
                    </div>
                ) : (
                    <>
                        <div className="block lg:hidden">
                            <div className="space-y-4 p-4">
                                {submissions.map((submission, index) => {
                                    const isLatest = index === 0;
                                    return (
                                        <div
                                            key={submission.id}
                                            className={`rounded-lg border ${isLatest ? "border-green-300 bg-green-50/30" : "border-gray-200 bg-white"} p-4 shadow-xs transition-all hover:shadow-sm`}
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${isLatest ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                                                    >
                                                        Lần {submissions.length - index}
                                                    </span>
                                                    {isLatest && (
                                                        <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                                                            Mới nhất
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="font-medium text-gray-700">Người nộp:</span>
                                                    <span className="ml-2 text-gray-600">
                                                        {submission.user.fullName}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-700">Thời gian:</span>
                                                    <span className="ml-2 text-gray-600">
                                                        {Helper.timeAgo(submission.submittedAt)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-700">Slide:</span>
                                                    <a
                                                        href={submission.slideLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
                                                    >
                                                        <LinkIcon size={12} />
                                                        <span className="max-w-[200px] truncate">
                                                            {submission.slideLink}
                                                        </span>
                                                    </a>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-700">Phân công:</span>
                                                    <a
                                                        href={submission.taskAssignmentLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
                                                    >
                                                        <LinkIcon size={12} />
                                                        <span className="max-w-[200px] truncate">
                                                            {submission.taskAssignmentLink}
                                                        </span>
                                                    </a>
                                                </div>
                                                {submission.productLinks && submission.productLinks.length > 0 && (
                                                    <div>
                                                        <span className="font-medium text-gray-700">Sản phẩm:</span>
                                                        <div className="mt-1 flex flex-wrap gap-2">
                                                            {submission.productLinks.map((link, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100"
                                                                >
                                                                    <LinkIcon size={10} />
                                                                    Link {i + 1}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {submission.note && (
                                                    <div>
                                                        <span className="font-medium text-gray-700">Ghi chú:</span>
                                                        <p className="mt-1 text-gray-600">{submission.note}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <table className="hidden w-full lg:table">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Lần nộp
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Người nộp
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Thời gian
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Slide thuyết trình
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Phân công task
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Sản phẩm
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase sm:px-6 sm:py-3.5">
                                        Ghi chú
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200/60 bg-white">
                                {submissions.map((submission, index) => {
                                    const isLatest = index === 0;
                                    return (
                                        <tr
                                            key={submission.id}
                                            className={`transition-colors ${isLatest ? "bg-green-50/30 hover:bg-green-50/50" : "hover:bg-gray-50/50"}`}
                                        >
                                            <td className="px-4 py-3.5 text-sm font-medium whitespace-nowrap sm:px-6 sm:py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-900">
                                                        Lần {submissions.length - index}
                                                    </span>
                                                    {isLatest && (
                                                        <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                                                            Mới nhất
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-700 sm:px-6 sm:py-4">
                                                {submission.user.fullName}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap text-gray-600 sm:px-6 sm:py-4">
                                                {Helper.timeAgo(submission.submittedAt)}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                <a
                                                    href={submission.slideLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex max-w-[200px] items-center gap-1 truncate text-blue-600 hover:underline"
                                                >
                                                    <LinkIcon size={14} />
                                                    <span className="truncate">{submission.slideLink}</span>
                                                </a>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                <a
                                                    href={submission.taskAssignmentLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex max-w-[200px] items-center gap-1 truncate text-blue-600 hover:underline"
                                                >
                                                    <LinkIcon size={14} />
                                                    <span className="truncate">{submission.taskAssignmentLink}</span>
                                                </a>
                                            </td>
                                            <td className="px-4 py-3.5 text-sm sm:px-6 sm:py-4">
                                                {submission.productLinks && submission.productLinks.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {submission.productLinks.map((link, i) => (
                                                            <a
                                                                key={i}
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100"
                                                            >
                                                                <LinkIcon size={10} />
                                                                Link {i + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Không có</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 text-sm text-gray-600 sm:px-6 sm:py-4">
                                                {submission.note || (
                                                    <span className="text-xs text-gray-400 italic">Không có</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default HistorySubmit;
