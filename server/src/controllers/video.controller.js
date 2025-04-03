import express from 'express';
import { PrismaClient } from '@prisma/client';
import getVideoViews from '../components/getVideoViews.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// Get recommended videos
export const GetRecomVideos = async (req,res,next) =>{
    try{
        let videos = await prisma.video.findMany({
            include:{
                user:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
    if (videos.length === 0) {
        return res.status(200).json({videos:[]})
    }

    videos = await getVideoViews(videos);

    res.status(200).json({ videos })

    }catch(error){
        next(error)
    }
} 

// Get trending videos
export const GetTrendVideos = async (req, res, next) => {
    try {
        let videos = await prisma.video.findMany({
            include:{
                user:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });

        if (videos.length === 0 ){
            return res.status(200).json({ videos:[]})
        }

        videos = await GetTrendVideos(videos);

        res.status(200).json({videos})
    } catch (error) {
        next(error)
    }
}

// Get video by id
export const GetVideoById = async (req, res, next) => {
    try {
        const { videoId } = req.params;

        const video = await prisma.video.findUnique({
            where:{
                id: videoId
            },
            include:{
                user:true
            }
        });

        if (!video) {
            return res.status(404).json({message:"Video not found"})
        }

        //Get view count
        const views = await prisma.view.count({
            where:{
                videoId
            }
        })

        video.views = views;

        //Recodrd a view;
        await prisma.view.create({
            data:{
                videoId,
                userId: req.cookies.token ? jwt.verify(req.cookies.token, process.env.JWT_SECRET).id : null
            }
        });

        res.status(200).json({video})
    } catch (error) {
        next(error)
    }
}

// Upload a video
export const UploadVideo = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({message:"Please provide title and description"})
        }

        if (!req.files || !req.files.video || !req.files.thumbnail) {
            return res.status(400).json({message:"Please upload a video and thumbnail"})
        }

        const videoPath = req.files.video[0].path;
        const thumbnailPath = req.files.thumbnail[0].path;

        const video = await prisma.video.create({
            data:{
                title,
                description,
                url:videoPath.replace(/\\/g,'/'),
                thumbnail:thumbnailPath.replace(/\\/g,'/'),
                userId: req.user.id
            }
        });

        res.status(201).json({video})

    } catch (error) {
        next(error)
    }
}

//Add like /dislike to video
export const AddLike = async (req, res, next) => {
    try{
        const { videoId } = req.params;
        const { like   } = req.body;// 1 for like  -1 for dislike , 0 for neutral

        //Check if video exists 
        const videoExists = await prisma.video.findUnique({
            where:{
                id: videoId
            }
        })

        if (!videoExists){
            return res.status(404).json({
                message:"Video not found"
            })
        }

        //Check if user has already liked/disliked the video
        const existingLike = await prisma.videoLike.findFirst({
            where:{
                userId:req.user.id,
                videoId
            }
        })

        if (existingLike){
            //Update existing like
            const updatedLike = await prisma.videoLike.update({
                where:{
                    id:existingLike.id
                },
                data:{
                    like
                }
            })

            return res.status(200).json({like:updatedLike})
        }

        //create new like
        const newLike = await prisma.videoLike.create({
            data:{
                like,
                userId:req.user.id,
                videoId
            }
        })

        res.status(201).json({like:newLike})
    } catch(error){
        next(error)
    }
}

//Add comment to video
export const AddComment = async (req, res, next) => {
    try{
        const { videoId } = req.params;
        const { text } = req.body;

        //Check if text is provided
        if (!text){
            return res.status(400).json({
                message:"Please provide a comment"
            })
        }

        //Check if video exists
        const videoExists = await prisma.video.findUnique({
            where:{
                id: videoId
            }
        })

        if (!videoExists){
            return res.status(404).json({
                message:"Video not found"
            })
        }
        //Create comment 
        const comment = await prisma.comment.create({
            data:{
                text,
                userId:req.user.id,
                videoId
            },
            include:{
                user:true
            }
        });

        res.status(201).json({comment})
    } catch (error) {
        next(error)
    }
}

//Get  comment for a video
export const GetComment = async (req, res, next) => {
    try{
        const {videoId} = req.params;

        const comments = await prisma.comment.findMany({
            where:{
                videoId
            },
            include:{
                user:true
            },
            orderBy:{
                createdAt:'desc'
            }
        })
        res.status(200).json({comments})
    } catch(error){
        next(error)
    }
}

//Search videos
export const searchVideos = async (req, res, next) => {
    console.log("✅ searchVideos function called");
    try {
        const { query } = req.query; // Extract the query parameter
        console.log("Search Query:", query);

        if (!query) {
            return res.status(400).json({ message: "Please provide a search query" });
        }

        const videos = await prisma.video.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } }
                ]
            },
            include: {
                user: true
            }
        });

        console.log("Search Results:", videos);

        if (videos.length === 0) {
            return res.status(404).json({ message: "No videos found" });
        }

        res.status(200).json({ videos });
    } catch (error) {
        console.error("Error in searchVideos:", error);
        next(error);
    }
};

