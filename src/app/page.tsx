import { createClient } from "redis"
import QuestionsPresentation from "./client-components/QuestionsPresentation";
import { run } from "./geminiWrapper";
import { Language } from "./types";

export const dynamic = 'force-dynamic';

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    lang: Language
  }>
}) {
  const params = await searchParams;
  const lang = params.lang || 'en';
  const value = await redis.get(`history-${lang}`);
  const history = JSON.parse(value || '[]');
  const data = await run(lang, history);
  const newHistory = [...history, ...data];
  await redis.set(`history-${lang}`, JSON.stringify(newHistory));

  return (
    <QuestionsPresentation questions={data} lang={lang} historyLength={history.length} />
  );
}
