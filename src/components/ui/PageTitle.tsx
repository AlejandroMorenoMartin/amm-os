interface PageTitleProps {
  children: React.ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h2 className="font-mono text-txt-l">
      {children}
    </h2>
  );
}
