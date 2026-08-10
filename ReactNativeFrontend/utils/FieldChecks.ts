const MIN_LENGTH_PASSWORD = 8;
const MIN_SPECIAL_SYMBOLS_PASSWORD = 1;
const MIN_NUMBER_PASSWORD = 1;

export interface PasswordCheckError {
  key: string;
  params: Record<string, number>;
}

interface PasswordCheckResult {
  valid: boolean;
  errors: PasswordCheckError[];
}

export function PasswordCheck(
  password: string,
  minLength: number = MIN_LENGTH_PASSWORD,
  minSpecialSymbols: number = MIN_SPECIAL_SYMBOLS_PASSWORD,
  minNumbers: number = MIN_NUMBER_PASSWORD
): PasswordCheckResult {
  const errors: PasswordCheckError[] = [];

  if (password.length < minLength) {
    errors.push({ key: "validation.passwordMinLength", params: { min: minLength } });
  }

  const specialSymbolsCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
  if (specialSymbolsCount < minSpecialSymbols) {
    errors.push({ key: "validation.passwordMinSpecialSymbols", params: { min: minSpecialSymbols } });
  }

  const numbersCount = (password.match(/[0-9]/g) || []).length;
  if (numbersCount < minNumbers) {
    errors.push({ key: "validation.passwordMinNumbers", params: { min: minNumbers } });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
