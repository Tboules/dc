export interface NextJsPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] };
}
