export function capitalize(text: string): string {
  if (!text) return text;

  return text
    .toLocaleLowerCase()
    .split(" ")
    .map((character) => character.charAt(0).toUpperCase() + character.slice(1))
    .join(" ");
}
