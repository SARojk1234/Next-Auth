import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection

        connection.on('Connected',()=>{
            console.log('MongoDB connected');
            
        })
        connection.on('error', (err)=>{
            console.log('Something Went Wrong connection error' + err);
            process.exit()
        })
    } catch (error) {
        console.log('Something Went Wrong in connecting the database');
        console.log(error);
        
        
    }

}