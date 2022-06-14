export default function addCurrency(value: string | number = 0) {
  return <>&euro; {` ${String(value)}`}</>
}
