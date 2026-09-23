export default function StatusBadge({ label, count, color }) {
  return (
    <span className={`badge rounded-pill bg-${color}`}>
      {label} {count}
    </span>
  );
}
