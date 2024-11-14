import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel"
import { error } from "console";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                error: "User does not exists"
            }, { status: 400 })
        }

        const validPassword = bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({
                error: "Check your credentials"
            },
                {
                    status: 400
                })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Logged in Successfully",
            success: true
        })

        response.cookies.set("token", token, { httpOnly: true })
        return response
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 })


    }

}




