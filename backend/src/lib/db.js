import mongoose from 'mongoose';


export const  connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGO DB CONNECTED AT ${conn.connection.host}`)
    }
    catch(error){
        console.log("Mongo error due to ",error);
    };
    
}