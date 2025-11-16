export function formatRelativeTime(dateString) {
  if (!dateString) return "";

  const now = new Date();
  const then = new Date(dateString);
  const diff = (now - then) / 1000; // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
  if (diff < 86400 * 2) return `1 day ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} days ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / (86400 * 7))} week ago`;
  if (diff < 86400 * 60) return `1 month ago`;
  if (diff < 86400 * 365) return `${Math.floor(diff / (86400 * 30))} months ago`;
  return `${Math.floor(diff / (86400 * 365))} year ago`;
}
