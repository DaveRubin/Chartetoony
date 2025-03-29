'use client'
import { useRouter } from "next/navigation"


export default function QuestionsPresentation({ questions, lang }: { questions: string[], lang: 'en' | 'he' }) {
    const router = useRouter()
    const isHebrew = lang === 'he'

    return <div dir={isHebrew ? 'rtl' : 'ltr'} className={`flex flex-col gap-4`} >
        <div className="flex flex-col gap-4 items-center  min-h-screen">
            <p className="text-lg">
                False Trivia
            </p>

            <ul className="list-decimal max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                {questions.map((question) => (
                    <li key={question}>
                        {question}
                    </li>
                ))}
            </ul>

            <button onClick={() => {
                router.push(`/?lang=${isHebrew ? 'en' : 'he'}`)
            }}>switch to {isHebrew ? 'English' : 'Hebrew'}</button>

        </div>
    </div>
}