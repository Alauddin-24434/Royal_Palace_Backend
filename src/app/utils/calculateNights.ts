// utils/calculateNights.ts
export const calculateNights = (
  checkIn: string,
  checkOut: string,
): number => {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  const diffTime = outDate.getTime() - inDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays <= 0) {
    throw new Error("Invalid check-in/check-out date");
  }

  return Math.ceil(diffDays); // hotel standard
};
