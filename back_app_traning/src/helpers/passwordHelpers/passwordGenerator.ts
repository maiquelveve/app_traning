export const passwordGenerator = (): string => {
  
  // GENERATE A RANDOM PASSWORD WITH 7 CHARACTERS
  return Math.random().toString(36).substring(0, 7);
};
