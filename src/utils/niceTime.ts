export const niceTime = (millisec: number) => {
  const seconds = Number((millisec / 1000).toFixed(0));
  let minutes: number = Math.floor(Number(seconds) / 60);
  let hours = 0;
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
  }
  if (hours) {
    return `${hours} hours, ${minutes} minutes`;
  }
  return `${minutes} minutes`;
};
