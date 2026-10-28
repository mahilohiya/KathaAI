"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { generateStory } from "../lib/api";

const THEMES = ["दोस्ती", "जंगल", "त्योहार", "जानवर", "स्कूल", "समुद्र"];
const CHARACTERS = ["गोलू", "मीना", "चिंटू", "रानी", "आरा"];

export function StorySetup() {
  const router = useRouter();
  const [ageGroup, setAgeGroup] = useState<"3-5" | "6-8" | "9-10">("6-8");
  const [theme, setTheme] = useState("जंगल");
  const [character, setCharacter] = useState("गोलू");
  const [interests, setInterests] = useState("जानवर और दोस्ती");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const story = await generateStory({
        language: "hi",
        age_group: ageGroup,
        theme,
        character,
        interests,
      });
      router.push(`/story/${story.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "कहानी नहीं बन सकी।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="grid gap-2">
        <span className="text-sm font-semibold tracking-wide text-[#6b3a2a]">Language</span>
        <div className="flex gap-3">
          <span className="rounded-full bg-[#c45c26] px-4 py-2 text-sm font-medium text-white">
            हिन्दी
          </span>
          <span className="rounded-full bg-[#ead9c4] px-4 py-2 text-sm text-[#8a6a52]">
            ಕನ್ನಡ soon
          </span>
        </div>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[#6b3a2a]">Age group</span>
        <select
          value={ageGroup}
          onChange={(event) => setAgeGroup(event.target.value as typeof ageGroup)}
          className="rounded-2xl border border-[#e2c8ad] bg-white px-4 py-3"
        >
          <option value="3-5">3–5 years</option>
          <option value="6-8">6–8 years</option>
          <option value="9-10">9–10 years</option>
        </select>
      </label>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold text-[#6b3a2a]">Theme</legend>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setTheme(item)}
              className={`rounded-full px-4 py-2 text-sm ${
                theme === item
                  ? "bg-[#1f4d3a] text-white"
                  : "bg-[#f4e6d4] text-[#4b2e22]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[#6b3a2a]">Main character</span>
        <input
          value={character}
          onChange={(event) => setCharacter(event.target.value)}
          list="characters"
          className="rounded-2xl border border-[#e2c8ad] bg-white px-4 py-3"
        />
        <datalist id="characters">
          {CHARACTERS.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[#6b3a2a]">Interests</span>
        <input
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
          className="rounded-2xl border border-[#e2c8ad] bg-white px-4 py-3"
        />
      </label>

      {error ? <p className="text-sm text-[#9b2c2c]">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[#c45c26] px-6 py-3 text-base font-semibold text-white disabled:opacity-60"
      >
        {loading ? "कहानी बन रही है..." : "कहानी शुरू करो"}
      </button>
    </form>
  );
}
