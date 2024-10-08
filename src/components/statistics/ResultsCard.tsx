import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Award, Target, Trophy } from 'lucide-react'

type Props = {accuracy:number}

const ResultsCard = ({accuracy}: Props) => {
    accuracy=Math.round(accuracy * 100)/100;
    return (
    <Card className='md:col-span-7'>
        <CardHeader className='flex flex-row items-center justify-between pb-7 space-y-0'>
            <CardTitle className='text-2xl fond-bold'>Results</CardTitle>
            <Award />
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center h-3/5'>
            {accuracy > 75 ? (
                <>
                <Trophy className='mr-4' stroke='gold' size={50}/>
                <div className='flex flex-col text-2xl font-semibold text-yellow-400'>
                <span>Impressive!</span>
                <span className='text-sm text-center text-black opacity-50'>
                    {'> 75% accuracy'}
                </span>
                </div>
                </>
            ) : accuracy > 25 ?(
                    <>
                    <Trophy className='mr-4' stroke='silver' size={50}/>
                    <div className='flex flex-col text-2xl font-semibold text-stone-400'>
                    <span>Good Job!</span>
                    <span className='text-sm text-center text-black opacity-50'>
                        {'> 25% accuracy'}
                    </span>
                    </div>
                    </>
        ) : (
                <>
                <Trophy className='mr-4' stroke='brown' size={50}/>
                <div className='flex flex-col text-2xl font-semibold text-yellow-800'>
                <span>Nice Try!</span>
                <span className='text-sm text-center text-black opacity-50'>
                    {'< 25% accuracy'}
                </span>
                </div>
                </>
        )}
        </CardContent>
    </Card>
  )                  
}

export default ResultsCard