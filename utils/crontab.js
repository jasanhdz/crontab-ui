export function getSplitValues(values, split, items, type = false) {
  if (values.includes(split)) {
    values = values.split(split).map(str => isNaN(str) ? str : Number(str))
    return { one: values[0] === '*' ? 1 : values[0], two: values[1] }
  }
  if (type) return { one: 1, two: items[1].value }
  return { one: items[0].value, two: items[1].value }
}