'use client'
import Timer from "./Timer"
import { useEffect, useState } from "react"
import { Language } from "../types"

export default function QuestionsPresentation({ questions, lang }: { questions: string[], lang: Language }) {
    const [running, setRunning] = useState(false)

    useEffect(() => {
        setRunning(false)
    }, [questions])

    return <div >
        <div className="flex flex-col gap-4 items-center  ">
            <ul className={`list-decimal max-w-md space-y-1  list-disc list-inside dark:text-white ${running ? '' : 'opacity-50'}`}>
                {questions.map((question) => (
                    <li key={question}>
                        {question}
                    </li>
                ))}
            </ul>

            <Timer lang={lang} onComplete={() => {
                setRunning(false)
            }} onStart={() => {
                setRunning(true)
            }} />
        </div>
    </div>
}