// /api/game

import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import axios from 'axios';
import { ZodError } from "zod";
import { GameType } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function POST(req:Request,res:Response){
    try {
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json(
                {
                    error:"You must be logged in to create a quiz"
                },
                {
                    status:401,
                }
            );
        }
        const body= await req.json();
        const{amount,topic,type}= quizCreationSchema.parse(body);
        const game = await prisma.game.create({
            data:{
                gameType:type,
                timeStarted: new Date(),
                userId: session.user.id,
                topic
            }
        })
        console.log("h1")
        const {data} = await axios.post(`${process.env.API_URL}/api/questions` ,{
            amount,
            type,
            topic,
        })
        if(type ==='mcq'){
            type mcqQuestion ={
                question:string,
                answer:string,
                option1:string,
                option2:string,
                option3:string,
            }
    
            const manyData= data.questions.map(async (question: mcqQuestion) =>{
                
                const options=[question.answer,question.option1,question.option2,question.option3].sort(() => Math.random() -0.5)
                await prisma.question.createMany({
                    data: manyData,
                })
                
                return{
                    Question: question.question,
                    answer:question.answer,
                    options:JSON.stringify(options),
                    gameId: game.id,
                    questionType:'mcq'
                }
            })
        }
        else if(type==="open_ended"){
            type openQuestion={
                question:string,
                answer:string,
            }

            let manyData = data.questions.map((question:openQuestion) => {
                return{
                    question:question.question,
                    answer:question.answer,
                    gameId:game.id,
                    questionType: 'open_ended'
                }
            })
            await prisma.question.createMany({
                data:manyData,
            })
        }
        
        return NextResponse.json({
            gameId:game.id
        })
    } catch (error) {
        if(error instanceof ZodError){
            return NextResponse.json(
                {
                    error:error.issues,
                },
                {
                    status:400,
                }
            );
        }
        return NextResponse.json(
            {
                error:"Something went wrong",
            },
            {status: 510},
        )
    }
}