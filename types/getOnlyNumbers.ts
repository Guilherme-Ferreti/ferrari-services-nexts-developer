export function getOnlyNumbers(value: string) {
  return String(value.replaceAll(/[^\d]/g, ''));
}
