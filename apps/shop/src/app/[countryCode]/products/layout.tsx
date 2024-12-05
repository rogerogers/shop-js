export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { countryCode: string };
}) {
  return <div className="container">{children}</div>;
}
