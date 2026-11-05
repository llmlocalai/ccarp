import ContentPage from "@/components/ContentPage";
import { examDayHtml } from "@/content/exam-day";

export const metadata = { title: "Exam-Day Strategy" };

export default function Page() {
  return <ContentPage html={examDayHtml} />;
}
