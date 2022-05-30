export default function isPasswordCorrect(
  provided: string,
  correct: string
): boolean {
  let matched = provided.length === correct.length
  for (let i = 0; i < correct.length; i++) {
    if (provided[i] !== correct[i]) matched = false
  }
  return matched
}
