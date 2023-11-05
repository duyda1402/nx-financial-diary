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
