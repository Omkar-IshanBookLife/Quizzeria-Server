import { PrismaClient } from "@prisma/client"
import cors from "cors"
import express, { Application } from "express"
import morgan from "morgan"
import router from "./routes"

const prisma = new PrismaClient()

const main = async () => {
    const app: Application = express()
    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.json())
    app.use("/api", router)

    app.listen(5000, () => {
        console.log("🚀 Server running on http://localhost:5000/api");
    })
}

main()
    .catch(err => console.error(err))
    .finally(async () => await prisma.$disconnect())