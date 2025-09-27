import { formatDate, Note } from "@innuendo/shared";

export default function Home() {
  const testNote: Note = {
    id: "1",
    title: "Тест из Shared!",
    content: "Shared типы работают!",
  };

  console.log("Test note:", testNote);
  console.log("Formatted date:", formatDate(new Date()));
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Innuendo. Hello. 
    </div>
  );
}
