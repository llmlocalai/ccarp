import ContentPage from "@/components/ContentPage";
import { aboutHtml } from "@/content/about";

export const metadata = { title: "About — How I Passed CCAR-P in a Week" };

export default function Page() {
  return <ContentPage html={aboutHtml} />;
}
