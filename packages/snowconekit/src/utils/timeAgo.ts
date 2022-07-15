export const timeAgo = (timestamp: number) => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  } else if (hours) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  } else if (minutes) {
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};
