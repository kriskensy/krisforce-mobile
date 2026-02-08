
export const formatDate = (dateString) => {
  if(!dateString) return '-';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return date.toLocaleDateString();
};