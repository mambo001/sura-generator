export function generateSura(suraList: string[]) {
  if (suraList.length < 1) return 'No sura found';
  const randomIndex = Math.floor(Math.random() * suraList.length - 1);
  return suraList[randomIndex];
}

export function generateRandomColor() {
  const hex = Math.floor(Math.random() * 0xffffff);
  return '#' + hex.toString(16);
}
