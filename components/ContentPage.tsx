export default function ContentPage({ html }: { html: string }) {
  return (
    <div className="site-wrap pb-24">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
