"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { choosePath, getStory } from "../lib/api";
import { speakHindi, stopSpeaking } from "../lib/speech";
import type { StoryView } from "../lib/types";

export function StoryReader({ storyId }: { storyId: string }) {
  const [story, setStory] = useState<StoryView | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStory(storyId)
      .then(setStory)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Story not found");
      });
    return () => stopSpeaking();
  }, [storyId]);

  async function onChoose(choiceId: string) {
    if (!story) return;
    setLoading(true);
    setError("");
    stopSpeaking();
    try {
      setStory(await choosePath(story.id, choiceId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Choice failed");
    } finally {
      setLoading(false);
    }
  }

  if (error && !story) {
    return (
      <div className="rounded-3xl bg-white/90 p-8 shadow-sm">
        <p className="text-[#9b2c2c]">{error}</p>
        <Link href="/" className="mt-4 inline-block text-[#c45c26]">
          Start a new story
        </Link>
      </div>
    );
  }

  if (!story) {
    return <p className="text-[#6b3a2a]">कहानी खुल रही है...</p>;
  }

  return (
    <article className="rounded-[2rem] bg-[#fffaf3] p-8 shadow-[0_20px_50px_rgba(91,48,22,0.08)]">
      <p className="text-sm uppercase tracking-[0.2em] text-[#c45c26]">
        दृश्य {story.scene_index}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#4b2e22]">
        {story.title}
      </h1>
      <p className="mt-2 text-sm text-[#8a6a52]">
        {story.character} · {story.theme} · {story.age_group} years
        {story.used_fallback ? " · offline story" : ""}
      </p>
      <p className="mt-8 font-[family-name:var(--font-hindi)] text-2xl leading-relaxed text-[#3f2a20]">
        {story.node.text}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => speakHindi(story.node.text)}
          className="rounded-full bg-[#1f4d3a] px-5 py-2 text-sm text-white"
        >
          सुनो
        </button>
        <button
          type="button"
          onClick={stopSpeaking}
          className="rounded-full bg-[#ead9c4] px-5 py-2 text-sm text-[#4b2e22]"
        >
          रोकें
        </button>
      </div>

      {error ? <p className="mt-4 text-sm text-[#9b2c2c]">{error}</p> : null}

      {story.is_complete ? (
        <div className="mt-8 grid gap-3">
          <p className="text-[#1f4d3a]">कहानी पूरी हुई। शुभ रात्रि!</p>
          <Link href="/" className="text-[#c45c26] underline">
            नई कहानी
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-3">
          <p className="text-sm font-semibold text-[#6b3a2a]">अब क्या होगा?</p>
          {story.node.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              disabled={loading}
              onClick={() => onChoose(choice.id)}
              className="rounded-2xl border border-[#e2c8ad] bg-white px-5 py-4 text-left font-[family-name:var(--font-hindi)] text-lg text-[#4b2e22] hover:border-[#c45c26] disabled:opacity-60"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
