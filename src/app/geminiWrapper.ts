import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "./types";
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });


const NUMBER_OF_QUESTIONS = 15;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOCK_EN =
    [
        'What color is a school bus?',
        'How many fingers are on one hand?',
        'What is frozen water called?',
        'What do bees make?',
        'What fruit is yellow and curved?',
        'What animal barks?',
        'What shape is a stop sign?',
        'What is the opposite of black?',
        'How many wheels are on a bicycle?',
        'What do cows drink?',
        'What is the color of the sky?',
        "What is the name of Santa's vehicle?",
        'What do you use to write on paper?',
        'What is the first letter of the alphabet?',
        'What month comes after January?'
    ]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOCK_HE = [
    `מי צייר את המונה ליזה?`,
    `מהי בירת צרפת?`,
    `מי המציא את הטלפון?`,
    `מהו הנהר הארוך בעולם?`,
    `מי כתב את התנ"ך?`,
    `מהי בירת אוסטרליה?`,
    `מי היה ראש הממשלה הראשון של ישראל?`,
    `מהו היסוד הנפוץ ביותר ביקום?`,
    `מי גילה את אמריקה?`,
    `מהו ההר הגבוה בעולם?`,
    `מהו האוקיינוס הגדול ביותר?`,
    `מי כתב את רומיאו ויוליה?`,
    `מהי בירת איטליה?`,
    `מהי החיה המהירה ביותר בעולם?`,
    `מי המציא את הנורה?`,
]


const getHEPrompt = (history: string[]) => {
    return `ספר ${NUMBER_OF_QUESTIONS} שאלות טריוויה קצרות וקלות\n
    השאלות שלך צריכות להיות שונות מהשאלות שלפני כן
    ${JSON.stringify(history)}
    `
}

const getENPrompt = (history: string[]) => {
    return `provide ${NUMBER_OF_QUESTIONS} really short and simple trivia questions\n
    the questions should be different from the ones before\n
    ${JSON.stringify(history)}
    `
}


export async function run(lang: Language, history: string[], mock: boolean) {
    if (mock) {
        return lang === 'en' ? [...MOCK_EN] : [...MOCK_HE]
    }
    const prompt = lang === 'en' ? getENPrompt(history) : getHEPrompt(history)
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING,
                },
            },
        },
    });

    return JSON.parse(response.text || '')


    // return lang === 'he' ? MOCK_HE : MOCK_EN

}
