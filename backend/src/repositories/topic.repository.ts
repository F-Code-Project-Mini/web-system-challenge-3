import prisma from "~/configs/prisma";

class TopicRepository {
    findWithPagination = async ({ skip, take }: { skip: number; take: number }) => {
        const [topics, total] = await Promise.all([
            prisma.topic.findMany({
                orderBy: { createdAt: "desc" },
                skip,
                take,
            }),
            prisma.topic.count(),
        ]);

        return { topics, total };
    };
}

const topicRepository = new TopicRepository();
export default topicRepository;
