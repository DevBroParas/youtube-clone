import express from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        //Check if user already exists
        const userExists = await prisma.user.findUnique({
            where:{
                email
            }
        });

        if(userExists){
            return res.status(400).json({ message:"User alread exists"});   
        }

        //Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        //Create token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{
            expiresIn: '30d'
        });

        //Send cookie
        res.cookie("token",token,{
            HTMLOnly:true,
            maxAge:30*24*60*60*1000,//30 days
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict"
        });

        //Return user data without password
        const {password: _, ...userData} = user;

        res.status(201).json({
            user:userData
        });
    } catch (error){
        next(error);
    }
}

  