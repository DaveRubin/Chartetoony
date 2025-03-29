import QuestionsPresentation from "./client-components/QuestionsPresentation";
import { run } from "./geminiWrapper";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    lang: 'en' | 'he'
  }
}) {
  const params = await searchParams;
  const data = await run(params.lang);

  return (
    <QuestionsPresentation questions={data} lang={params.lang} />
  );
}
