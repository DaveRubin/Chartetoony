import { run } from "./geminiWrapper";

export default async function Home() {
  const data = await run('en');
  console.log("🚀 ~ Home ~ data:", data)
  return (
    <ul>
      {
        data.map((item: string) => <li key={item}>
          {item}
        </li>)
      }
    </ul>
  );
}
