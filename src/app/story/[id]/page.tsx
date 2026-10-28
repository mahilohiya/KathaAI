import { StoryReader } from "../../../components/StoryReader";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <StoryReader storyId={id} />
    </main>
  );
}
