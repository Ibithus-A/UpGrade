export default function RootTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="animate-page-enter">{children}</div>;
}
