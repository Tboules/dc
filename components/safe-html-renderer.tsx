export default function SafeHtmlRenderer({
  htmlString,
}: {
  htmlString: string;
}) {
  const markup = { __html: htmlString };

  return <div className="text-lg" dangerouslySetInnerHTML={markup} />;
}
