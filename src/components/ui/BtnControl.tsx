interface BtnControlProps {
  label: string;
  onClick: () => void;
}

export function BtnControl({ label, onClick }: BtnControlProps) {
  return (
    <button
      onClick={onClick}
      className="btn-action"
    >
      {label}
    </button>
  );
}
