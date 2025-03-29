'use client'
import Timer from "./Timer"
import { useEffect, useState } from "react"
import { Language } from "../types"

export default function QuestionsPresentation({ questions, lang }: { questions: string[], lang: Language }) {
    const [isRunning, setIsRunning] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        setIndex(0);
        setIsRunning(false)
    }, [questions])

    useEffect(() => {
        if (isRunning) {
            setIndex(index + 1)
        }
    }, [isRunning])

    return <div >
        <div className="flex flex-col gap-4 items-center ">
            <div className="h-[150px] w-[300px] flex justify-center items-center relative mb-4" onClick={() => setIndex(index + 1)}>
                {questions.slice(0, index).map((question) => (
                    <div key={question} className="card fade-in-top text-2xl font-bold bg-yellow-300 p-4 text-black" dir={lang === 'he' ? 'rtl' : 'ltr'}>
                        {question}
                    </div>
                ))}
            </div>
            {(index < questions.length && isRunning) &&
                <button className="bg-gray-300 text-black p-4 font-bold rounded-md" onClick={() => setIndex(index + 1)}>Next Question {index}/{questions.length}</button>
            }
            <Timer isRunning={isRunning} lang={lang} setIsRunning={setIsRunning} />
        </div>
    </div>
}