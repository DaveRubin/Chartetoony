import { createClient } from "redis"
import QuestionsPresentation from "./client-components/QuestionsPresentation";
import { run } from "./geminiWrapper";
import { Language } from "./types";
import { Controls } from "./client-components/Controls";

export const dynamic = 'force-dynamic';

const redis = await createClient({ url: process.env.REDIS_URL }).connect();


type Params = {
  lang: Language
  mock: boolean
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const { lang, mock } = await searchParams;
  const value = await redis.get(`history-${lang}`);
  const history = JSON.parse(value || '[]');
  const data = await run(lang, history, !!mock);
  const newHistory = [...history, ...data];
  await redis.set(`history-${lang}`, JSON.stringify(newHistory));
  const isHebrew = lang === 'he'
  return (
    <div dir={isHebrew ? 'rtl' : 'ltr'} className={`flex flex-col gap-4 p-8 items-center`} >
      <QuestionsPresentation questions={data} lang={lang} />
      <Controls lang={lang} historyLength={history.length} />
    </div>

  );
}
