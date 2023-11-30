export function formatNumberWithCommas(number: number, prefix = "$") {
  return `${prefix} ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export function mapUrlAsset(name?: string | null) {
  if (!name) {
    return "";
  }
  const base = process.env.EXPO_PUBLIC_API_BASE_URL!;
  return `${base}/assets/public/${name}`;
}

export function formatTimeTransaction(time: string | Date) {
  const now = new Date();
  const inputDate = new Date(time);
  if (
    inputDate.getDate() === now.getDate() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getFullYear() === now.getFullYear()
  ) {
    return `Today - ${formatAmPm(inputDate)}`;
  } else {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      inputDate.getDate() === yesterday.getDate() &&
      inputDate.getMonth() === yesterday.getMonth() &&
      inputDate.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday - ${formatAmPm(inputDate)}`;
    } else {
      const day = inputDate.getDate();
      const month = inputDate.getMonth() + 1;
      const year = inputDate.getFullYear();
      return `${day}/${month}/${year} - ${formatAmPm(inputDate)}`;
    }
  }
}

function formatAmPm(inputDate: Date) {
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
