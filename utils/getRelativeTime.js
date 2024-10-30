export default function getRelativeTime(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const minuteDiff = Math.floor((now - createdDate) / (1000 * 60));

  if (minuteDiff < 60) {
    return `${minuteDiff} min`;
  }

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) {
    return `${hourDiff} hr`;
  }

  const dayDiff = Math.floor(hourDiff / 24);
  if (dayDiff < 30) {
    return `${dayDiff} d`;
  }

  const monthDiff = Math.floor(dayDiff / 30);
  if (monthDiff < 12) {
    return `${monthDiff} m`;
  }

  const yearDiff = Math.floor(monthDiff / 12);
  return `${yearDiff} y`;
}
