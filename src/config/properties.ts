import dotenv from "dotenv";

dotenv.config();

interface Iproperties {
    PORT: number;
    SERVER_URL: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    AES_SECRET: string;
}

const properties:Iproperties = {
    PORT: Number(process.env.PORT) || 3000,

    SERVER_URL: process.env.SERVER_URL || 
        'http://localhost:3000',

    MONGO_URI: process.env.MONGO_URI || 
        'mongodb+srv://authenticatorAbhi:authenticatorAbhi2001@cluster0.rm1wmo7.mongodb.net/authenticator',

    JWT_SECRET: process.env.JWT_SECRET || 
        'hgdhfdoodsptypwmxzndfklmv',

    AES_SECRET: process.env.AES_SECRET || 
        'eaf56d5b0013e8f3688afc8ecad97bd6e0fg3e1c721a0acafb533dg'
}

export default properties;