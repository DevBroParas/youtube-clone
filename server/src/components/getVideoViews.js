import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

async function getVideoViews(videos) {
    for (const video of videos) {
        const views = await Prisma.view.count({
            where:{
                videoId: video.id
            }
        })
        video.views = views;
    }
    return videos;
}

export default getVideoViews;