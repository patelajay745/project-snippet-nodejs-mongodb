import 'dotenv/config'
import connectDB from "@/db"
import app from './app';

import http from 'http'

const PORT = process.env.PORT ?? 8082

const httpServer = http.createServer(app)

connectDB().then(() => httpServer.listen(PORT, () => {
    console.log(`server running on ${process.env.BASEURL}:${PORT}`)
}))

