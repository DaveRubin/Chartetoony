import QuestionsPresentation from "./client-components/QuestionsPresentation";
import { run } from "./geminiWrapper";
import { Language } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    lang: Language
  }
}) {
  const params = await searchParams;
  const data = await run(params.lang);

  return (
    <QuestionsPresentation questions={data} lang={params.lang} />
  );
}
