'use client'
import { useEffect, useState } from "react"
import { Language } from "../types"

export default function Timer({ onComplete, onStart, lang }: { onComplete: VoidFunction, onStart: VoidFunction, lang: Language }) {
    const [time, setTime] = useState(60)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false)
                        onComplete()
                        return 0
                    }
                    return prevTime - 1
                })
            }, 1000)
        }

        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, onComplete])

    const handleStart = () => {
        onStart();
        setTime(60)
        setIsRunning(true)
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handleStart}
                disabled={isRunning}
                className="w-full max-w-md py-4 px-8 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
                {isRunning ? `${time}s` : lang === 'he' ? 'התחל' : 'Start'}
            </button>

        </div>
    )
}