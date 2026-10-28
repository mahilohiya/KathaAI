export type Choice = {
  id: string;
  text: string;
};

export type StoryNode = {
  id: string;
  text: string;
  language: string;
  is_ending: boolean;
  choices: Choice[];
};

export type StoryView = {
  id: string;
  title: string;
  language: string;
  age_group: string;
  theme: string;
  character: string;
  scene_index: number;
  used_fallback: boolean;
  node: StoryNode;
  is_complete: boolean;
};

export type GeneratePayload = {
  language: "hi";
  age_group: "3-5" | "6-8" | "9-10";
  theme: string;
  character: string;
  interests: string;
};
