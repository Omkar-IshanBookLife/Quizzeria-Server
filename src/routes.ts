import express from "express"
import { PrismaClient, Question } from "@prisma/client"

const prisma = new PrismaClient()

const router = express.Router()

const questionRouter = express.Router()

questionRouter.get("/", async (req, res) => {
    const { take, page } = req.query
    const questions = await prisma.question.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: parseInt(take!.toString()),
        skip: parseInt(take!.toString()) * (parseInt(page!.toString()) - 1)
    })
    res.json(questions)
})

questionRouter.get("/count", async (_req, res) => {
    const count = await prisma.question.count()
    res.json({ count })
})

questionRouter.get("/random", async (_req, res) => {
    const questions = await prisma.question.findMany({})
    const question = questions[Math.floor(Math.random()*questions.length)]
    res.json(question)
})

questionRouter.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const question = await prisma.question.findUnique({where: { id }}) as Question
    res.json(question)
})

questionRouter.post("/", async (req, res) => {
    const data = req.body
    const question = await prisma.question.create({data})
    res.json(question)
})

questionRouter.delete("/:id", async (req, res) => {
    const {id} = req.params
    await prisma.question.delete({ where: { id: parseInt(id) } })
    res.json(true)
})

router.use("/questions", questionRouter)

export default router