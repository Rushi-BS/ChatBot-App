import { config } from "dotenv";

config();

const { NODE_ENV, PORT, SECRET_KEY, SECRET_IV, ECNRYPTION_METHOD, OPENAI_API_KEY} = process.env

export default {
    env: NODE_ENV,
    port: PORT,
    secret_key: SECRET_KEY,
    secret_iv: SECRET_IV,
    encryption_method: ECNRYPTION_METHOD,
    openai_api_key: OPENAI_API_KEY
};