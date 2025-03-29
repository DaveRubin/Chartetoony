'use client'
import { useRouter } from "next/navigation"
import Timer from "./Timer"
import { useState } from "react"
import { Language } from "../types"

export default function QuestionsPresentation({ questions, lang }: { questions: string[], lang: Language }) {
    const router = useRouter()
    const isHebrew = lang === 'he'
    const [running, setRunning] = useState(false)

    return <div dir={isHebrew ? 'rtl' : 'ltr'} className={`flex flex-col gap-4 p-8`} >
        <div className="flex flex-col gap-4 items-center  min-h-screen">
            <p className="text-lg">
                False Trivia
            </p>
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

            <div className="flex gap-4 items-center">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={() => {
                    router.push(`/?lang=${isHebrew ? 'en' : 'he'}`)
                }}>{isHebrew ? 'English' : 'עברית'}
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => router.refresh()}>Next</button>
            </div>
        </div>
    </div>
}