import { StorySetup } from "../components/StorySetup";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12 lg:flex-row lg:items-start">
      <section className="max-w-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-[#c45c26]">KathaAI</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-tight text-[#4b2e22]">
          बच्चों के लिए हिन्दी कहानियाँ
        </h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-[#6b3a2a]">
          Choose a character, a theme and an age group. KathaAI writes a new
          story, then lets the child decide what happens next.
        </p>
      </section>
      <section className="w-full rounded-[2rem] bg-[#fffaf3] p-8 shadow-[0_20px_50px_rgba(91,48,22,0.08)]">
        <StorySetup />
      </section>
    </main>
  );
}
