import mongoose from 'mongoose'

export const dbConfig = async () => {
    try {
        return await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('Database Connected');
        });
      
    } catch (error) {
        console.log(error);
    }
}