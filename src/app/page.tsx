import QuestionsPresentation from "./client-components/QuestionsPresentation";
import { run } from "./geminiWrapper";
import { Language } from "./types";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    lang: Language
  }>
}) {
  const params = await searchParams;

  const data = await run(params.lang);

  return (
    <QuestionsPresentation questions={data} lang={params.lang} />
  );
}
