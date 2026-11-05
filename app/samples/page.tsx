import ContentPage from "@/components/ContentPage";
import QuizScript from "@/components/QuizScript";
import { samplesHtml } from "@/content/samples";

export const metadata = { title: "Official Sample Questions" };

export default function Page() {
  return (
    <>
      <QuizScript />
      <ContentPage html={samplesHtml} />
    </>
  );
}
