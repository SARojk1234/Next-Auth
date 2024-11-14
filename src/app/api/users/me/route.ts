import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/getGataFromToken";

connect();

export async function GET(request: NextRequest){
    try {
        const userId= await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        if(!user){
            return NextResponse.json({
                message:"user not found",
                success:false
            },{status:400})
        }
        return NextResponse.json({
            message:"User Found",
            data:user
        })
        
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },
            { status: 500 })
    }
}