import dotenv from "dotenv";

dotenv.config();

interface Iproperties {
    PORT: number;
    SERVER_URL: string;
    MONGO_URI: string;
    JWT_SECRET: string;
}

const properties:Iproperties = {
    PORT: Number(process.env.PORT) || 3000,

    SERVER_URL: process.env.SERVER_URL || 
            'http://localhost:3000',

    MONGO_URI: process.env.MONGO_URI || 
            'mongodb+srv://authenticatorAbhi:authenticatorAbhi2001@cluster0.rm1wmo7.mongodb.net/authenticator',

    JWT_SECRET: process.env.JWT_SECRET || 
                'hgdhfdoodsptypwmxzndfklmv'
}

export default properties;