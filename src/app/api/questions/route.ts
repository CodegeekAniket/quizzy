import { NextResponse } from "next/server"
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
//POST /api/questions
export const POST = async (req: Request, res: Response) => {
    try {
        const body= await req.json();
        const{amount,topic,type}= quizCreationSchema.parse(body)
        let questions :any;
        if(type==='mcq'){
            questions=await strict_output(
                "You are a helpful ai"
            );
        }
        return NextResponse.json({
        hello:"world",
        });
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
    }
}