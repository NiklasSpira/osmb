import bcrypt from 'bcrypt';

// Number of salt rounds used in bcrypt hashing
const saltRounds = 10;

/**
 * Hashes a plain text password.
 * @param password
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password to compare with.
 * @returns True if the password is valid, false otherwise.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}