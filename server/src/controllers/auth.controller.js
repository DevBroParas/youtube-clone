import express from 'express'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        //Check if all fields are filled
        if(!username || !email || !password){
            return res.status(400).json({ message:"All fields are required"});
        }

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

export const login = async (req, res, next) => {
 try {
    const {email,password} = req.body;

    //Check if all fields are filled
    if(!email || !password){
        return res.status(400).json({ message:"All fields are required"});
    }

    //check if user exists 
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!user){
        return res.status(400).json({ message:"Invalid credentials"});
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({ message:"Invalid credentials"});
    }

    //Create token
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });

    //set cookie
    res.cookie("token",token,{
        httpOnly: true,
        maxAge:30*24*60*60*1000,//30 days
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict"
    })

    //Return user data without password 
    const {password: _, ...userData} = user;

    res.status(200).json({
        user:userData
    });

 } catch (error) {
    next(error);
 }
}

export const logout = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message:"Logged out successfully"});
}
  
export const me = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ message:"Not authorized to access this route"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if(!user){
            return res.status(401).json({ message:"User not found"});
        }

        const {password: _, ...userData} = user;

        res.status(200).json({
            user:userData
        });
    } catch (error) {
        next(error);
    }
}
