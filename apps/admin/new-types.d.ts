interface ServerParams {
  params: Promise<{ slug: string; attribute_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
