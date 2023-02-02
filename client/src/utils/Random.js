export function generateRandomArray(limit = 0) {
  const randomArray = [];
  for (let i = 0; i < limit; i++)
    randomArray.push(Math.floor(Math.random() * 12345 + 1));
  return randomArray;
}

export function randomNumber() {
  return Math.floor(Math.random() * 12345678 + 1);
}
