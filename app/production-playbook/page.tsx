import ContentPage from "@/components/ContentPage";
import { productionPlaybookHtml } from "@/content/production-playbook";

export const metadata = { title: "Production Playbook — Applying CCAR-P" };

export default function Page() {
  return <ContentPage html={productionPlaybookHtml} />;
}
