import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const protect = async (req, res, next) => {
    try{
        //Get token from cookies
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ message:"You need to be logged in to access this route"})
        }

        //Verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Get user from database
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if(!user){
            return res.status(401).json({ message:"User not found"})
        }

        //Add user to request object 
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message:"Not authorized to access this route"})
    }
}