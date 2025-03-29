'use client'
import { useRouter } from "next/navigation"
import Timer from "./Timer"
import { useState } from "react"
import { Language } from "../types"
import { clearHistory } from '../actions'

export default function QuestionsPresentation({ questions, lang, historyLength }: { questions: string[], lang: Language, historyLength: number }) {
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

            <button
                onClick={() => clearHistory(lang)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Clear History ({historyLength})
            </button>
        </div>
    </div>
}