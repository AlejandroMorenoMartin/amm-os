interface PageTitleProps {
  children: React.ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="font-mono text-txt-xxl">
      {children}
    </h1>
  );
}
