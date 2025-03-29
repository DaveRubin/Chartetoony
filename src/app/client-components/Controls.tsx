'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { clearHistory } from '../actions'
import { Language } from "../types"


export function Controls({ lang, historyLength }: { lang: Language, historyLength: number }) {
    const isHebrew = lang === 'he'
    const router = useRouter()
    const searchParams = useSearchParams();
    function updateParams(key: string, value: string) {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)
        router.push(`/?${params.toString()}`)
    }

    return (
        <div>
            <div className="flex gap-4 items-center">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={() => {
                    updateParams("lang", isHebrew ? 'en' : 'he')
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
    )
}