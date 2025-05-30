export const formatStopwatchTime = (timeInMs: number): string => {
  const totalMilliseconds = Math.floor(timeInMs);
  const milliseconds = String(totalMilliseconds % 1000).padStart(3, '0').slice(0, 2); // Get first two digits of ms
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');

  if (hours !== '00') {
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
  return `${minutes}:${seconds}.${milliseconds}`;
};
