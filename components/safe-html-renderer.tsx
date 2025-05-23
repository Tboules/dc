const HTML_STRING_MAX_LENGTH = 300;

export default function SafeHtmlRenderer({
  htmlString,
}: {
  htmlString: string;
}) {
  const truncatedString =
    htmlString.length > HTML_STRING_MAX_LENGTH
      ? htmlString.substring(0, HTML_STRING_MAX_LENGTH) + "..."
      : htmlString;

  const markup = {
    __html: truncatedString,
  };

  return <div className="text-lg" dangerouslySetInnerHTML={markup} />;
}
