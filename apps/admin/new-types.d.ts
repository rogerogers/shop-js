interface ServerParams {
  params: { slug: string; attribute_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
