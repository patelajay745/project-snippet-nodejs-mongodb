import 'dotenv/config'
import connectDB from "@/db"
import app from './app';
import { env } from '@/validators/env';

const PORT = env.PORT ?? 8000

connectDB().then(() => app.listen(PORT, () => {
    console.log(`server running on ${env.BASEURL}:${PORT}`)
}))

