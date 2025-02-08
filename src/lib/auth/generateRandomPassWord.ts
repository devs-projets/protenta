export function generateStrongPassword() {
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}<>?";

  const allCharacters = lowerCase + upperCase + numbers + symbols;

  // Assure que le mot de passe contient au moins un de chaque type de caractère
  const randomLower = lowerCase[Math.floor(Math.random() * lowerCase.length)];
  const randomUpper = upperCase[Math.floor(Math.random() * upperCase.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

  // Ajoute 4 caractères supplémentaires aléatoires
  let remainingCharacters = "";
  for (let i = 0; i < 4; i++) {
    remainingCharacters +=
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  // Combine tous les caractères et mélange-les
  const password = (
    randomLower +
    randomUpper +
    randomNumber +
    randomSymbol +
    remainingCharacters
  )
    .split("") // Convertit la chaîne en tableau
    .sort(() => Math.random() - 0.5) // Mélange aléatoirement les caractères
    .join(""); // Reconvertit en chaîne

  return password;
}
