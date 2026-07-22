export function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function yearOf(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').getFullYear().toString();
}

/** Best-effort YouTube thumbnail URL from a watch/share link. Returns null for non-YouTube links. */
export function youTubeThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}
