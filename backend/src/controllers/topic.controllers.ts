import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { RoleType } from "~/constants/enums";
import { HTTP_STATUS } from "~/constants/httpStatus";
import topicRepository from "~/repositories/topic.repository";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

interface TopicQuery {
    page?: string;
    limit?: string;
}

// GET ALL
export const getAll = async (
    req: Request<ParamsDictionary, any, any, TopicQuery>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Giá trị page/limit phải là số nguyên >= 1.",
            });
        }

        const { topics, total } = await topicRepository.findWithPagination({ page, limit });

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            data: topics.map((topic) => ({
                id: topic.id,
                title: topic.title,
                file_path: topic.filePath,
                created_at: topic.createdAt,
                updated_at: topic.updatedAt,
            })),
            pagination: {
                total,
                page,
                limit,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// GET DETAIL
export const getDetail = async (
    req: Request<{ id: string }, any, any, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;

        if (!(uuidValidate(id) && uuidVersion(id) === 4)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id topic không hợp lệ.",
            });
        }

        if (req.role === RoleType.CANDIDATE) {
            if (!req.candidateId) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: false,
                    message: "Topic này không tồn tại trên hệ thống.",
                });
            }

            const canView = await topicRepository.candidateHasTopic({
                topicId: id,
                candidateId: req.candidateId,
            });

            if (!canView) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({
                    status: false,
                    message: "Topic này không tồn tại trên hệ thống.",
                });
            }
        }

        const topic = await topicRepository.findById(id);
        if (!topic) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Lấy thông tin đề tài thành công!",
            data: {
                id: topic.id,
                title: topic.title,
                file_path: topic.filePath,
                created_at: topic.createdAt,
                updated_at: topic.updatedAt,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// CREATE
export const create = async (
    req: Request<ParamsDictionary, any, { title?: string; file_path?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const title = req.body.title?.trim();
        const filePath = req.body.file_path?.trim();

        if (!title || !filePath) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Các trường không được để trống.",
            });
        }

        try {
            const url = new URL(filePath);
            if (url.protocol !== "http:" && url.protocol !== "https:") {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    status: false,
                    message: "file_path phải là url hợp lệ.",
                });
            }
        } catch {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "file_path phải là url hợp lệ.",
            });
        }

        await topicRepository.create({
            title,
            filePath,
        });

        return res.status(HTTP_STATUS.CREATED).json({
            status: true,
            message: "Đã thêm đề tài thành công!",
        });
    } catch (error) {
        return next(error);
    }
};

// UPDATE
export const update = async (
    req: Request<{ id: string }, any, { title?: string; file_path?: string }, any>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const title = req.body.title?.trim();
        const filePath = req.body.file_path?.trim();

        if (!(uuidValidate(id) && uuidVersion(id) === 4)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id topic không hợp lệ.",
            });
        }

        if (!title || !filePath) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Các trường không được để trống.",
            });
        }

        try {
            const url = new URL(filePath);
            if (url.protocol !== "http:" && url.protocol !== "https:") {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    status: false,
                    message: "file_path phải là url hợp lệ.",
                });
            }
        } catch {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "file_path phải là url hợp lệ.",
            });
        }

        const existed = await topicRepository.findById(id);
        if (!existed) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        const updated = await topicRepository.update(id, { title, filePath });

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Cập nhật chủ đề thành công!",
            data: {
                id: updated.id,
                title: updated.title,
                file_path: updated.filePath,
                updated_at: updated.updatedAt,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// DELETE
export const deleteTopic = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!(uuidValidate(id) && uuidVersion(id) === 4)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: "Id topic không hợp lệ.",
            });
        }

        const existed = await topicRepository.findById(id);
        if (!existed) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: false,
                message: "Topic này không tồn tại trên hệ thống.",
            });
        }

        const hasTeams = await topicRepository.hasTeams(id);
        if (hasTeams) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                status: false,
                message: "Không thể xóa topic đang được gán cho team.",
            });
        }

        await topicRepository.deleteById(id);

        return res.status(HTTP_STATUS.OK).json({
            status: true,
            message: "Xóa chủ đề thành công!",
        });
    } catch (error) {
        return next(error);
    }
};
