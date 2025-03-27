import express from 'express'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

// Get user profile
export const GetUserProfile = async (req, res, next) => {
    try {
        const { userId  } = req.params;

        const user = await prisma.user.findUnique({
            where:{
                id: userId
            },
            select:{
                id: true,
                createdAt: true,
                username: true,
                email: true,
                avatar: true,
                cover: true,
                about: true,
            }
        });

        if (!user){
            return res.status(404).json({message:"User not found"})
        }

        //Get subscriber count
        const subscriberCount = await prisma.subscription.count({
            where:{
                subscribedToId: userId
            }
        });

        //Get user's videos
        const videos = await prisma.video.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:'desc'
            }
        });

        //Get view count for each video
        let totalViews = 0;
        for (const video of videos) {
            const viewCount = await prisma.view.count({
                where: {
                    videoId: video.id
                }
            })
            video.views = viewCount;
            totalViews += viewCount;
        }

        res.status(200).json({user,subscriberCount,videos,totalViews});

    
    } catch (error) {
        next(error)
    }
}
// Update user profile
export const UpdateUserProfile = async (req, res, next) => {
    try{
        const { username, about } = req.body;
        const userId = req.user.id;

        // check if username and about are provided
        if (!username || !about) {
            return res.status(400).json({message:"Username and about are required"})
        }

        const updateData = {
            username,
            about
        };

        // If avatar is updated, update it 
        if (req.file){
            updateData.avatar = req.file.path.replace(/\\/g, "/");
        }

        const updatedUser = await prisma.user.update({
            where:{
                id: userId
            },
            data: updateData
        });

        const { password: _, ...userData } = updatedUser;

        res.status(200).json({user:userData});
    } catch (error) {    
        next(error)
    }
}

// Subscribe to channel
export const SubscribeToChannel = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const subscriberId = req.user.id;

        // Check if userId and subscriberId is present
        if (!userId || !subscriberId){
            return res.status(400).json({message:"UserId and subscriberId are required"})
        }

        // Ckeck if user exists
        const userExists = await prisma.user.findUnique({
            where:{
                id: userId
            }
        })

        if (!userExists){
            return res.status(404).json({ message: "User not found"})
        }

        // Check if already subscribed
        const existingSubscription = await prisma.subscription.findFirst({
            where:{
                subscriberId,
                subscribedToId: userId
            }
        });

        if (existingSubscription){
            return res.status(400).json({message:"Already subscribed to this channel"})
        }

        // Check subscription
        const subscription = await prisma.subscription.create({
            data:{
                subscriberId,
                subscribedToId: userId
            }

        })

        res.status(201).json({subscription})
    } catch (error) {
        next(error)
    }
}

// Unsubscribe from channel
export const UnsubscribeFromChannel = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const subscriberId = req.user.id;

        // Check if subscription exists
        const subscription = await prisma.subscription.findFirst({
            where:{
                subscriberId,
                subscribedToId: userId
            }
        });

        if (!subscription){
            return res.status(404).json({message:"Not subscribed to this channel"})
        }

        // Delete subscription
        await prisma.subscription.delete({
            where:{
                id: subscription.id
            }
        });

        res.status(200).json({message:"Unsubscribed successfully"})
    } catch (error){
        next(error)
    }
}

// Get subscribed channels
export const GetSubscribedChannels = async (req, res, next) => {
    try{
        const subscriptions = await prisma.subscription.findMany({
            where:{
                subscriberId: req.user.id
            },
            include:{
                subscribedTo: true
            }
        })

        const channels = subscriptions.map( sub => {
            const {password: _, ...userData } = sub.subscribedTo;
            return userData;
        })

        res.status(200).json({channels}) 
    } catch (error) {
        next(error)
    }
}

export const GetLikedVideos = async (req, res, next) => {
    try{
        const likedVideos = await prisma.videoLike.findMany({
            where:{
                userId: req.user.id,
                like: 1
            },
            include:{
                video:{
                    include:{
                        user:true
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        const videos = likedVideos.map(like => like.video);

        //Get view count for each video
        for (const video of videos) {
            const viewCount = await prisma.view.count({
                where: {
                    videoId: video.id
                }
            })
            video.views = viewCount;
        }
        res.status(200).json({videos})
    } catch (error) {
        next(error)
    }
}