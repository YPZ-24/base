import mongoose from 'mongoose';
import config from '../config/config';

const options = {   
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}

async function connect(){
    await mongoose.connect(config.DB.URL, options).then(()=>{
        console.log("DB Started");
    }).catch((error)=> {
        console.log("Error started DB");
        console.log(error);
    })
}

export default connect