import ContentPage from "@/components/ContentPage";
import { enterpriseAiSmeHtml } from "@/content/enterprise-ai-sme";

export const metadata = { title: "Enterprise AI Architecture SME" };

export default function Page() {
  return <ContentPage html={enterpriseAiSmeHtml} />;
}
