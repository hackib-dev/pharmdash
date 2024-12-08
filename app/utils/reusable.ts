export function getCurrentDateTime(): string {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const day = now.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const suffix = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${hours}:${minutes} ${ampm}, ${day}${suffix(day)} ${month} ${year}`;
}
