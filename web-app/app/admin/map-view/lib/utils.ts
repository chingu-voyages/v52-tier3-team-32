export function convertTimeslotToTimeWindow(
  timeslot: string,
  dateTimestamp: number
): [number, number] {
  // Convert the dateTimestamp into a Date object (multiply by 1000 to convert to milliseconds if it's in seconds)
  const baseDate = new Date(dateTimestamp * 1000); // Convert if dateTimestamp is in seconds

  // Split the timeslot into start and end times
  const [startTime, endTime] = timeslot.split(" - ");

  // Parse the start and end times into hours and minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Set the start time on the baseDate for the start timestamp
  baseDate.setHours(startHour, startMinute, 0, 0);
  const startTimestamp = Math.floor(baseDate.getTime() / 1000); // Get the start timestamp

  // Set the end time on the baseDate for the end timestamp
  baseDate.setHours(endHour, endMinute, 0, 0);
  const endTimestamp = Math.floor(baseDate.getTime() / 1000); // Get the end timestamp

  return [startTimestamp, endTimestamp];
}
