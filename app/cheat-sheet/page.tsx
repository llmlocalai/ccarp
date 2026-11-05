import ContentPage from "@/components/ContentPage";
import { cheatSheetHtml } from "@/content/cheat-sheet";

export const metadata = { title: "Cheat Sheet — Stem Signal → Answer" };

export default function Page() {
  return <ContentPage html={cheatSheetHtml} />;
}
