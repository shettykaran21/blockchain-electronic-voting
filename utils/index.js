import { intersection } from 'lodash'

const colors = ['#087CB8', '#ffb703', '#9b59b6', '#e74c3c']

let labelColors = {}

export const mapColorsToLabels = (labels) => {
  labels.length > colors.length &&
    colors.push(`#${Math.random().toString(16).substring(2, 8)}`)

  const usedKeys = intersection(Object.keys(labelColors), labels)
  let firstAvailColor = usedKeys.length

  let borderColors = []
  let usedColors = {}

  usedKeys.forEach((label) => {
    usedColors[labelColors[label]] = true
  })

  labels.forEach((label) => {
    if (!labelColors[label]) {
      while (usedColors[colors[firstAvailColor]]) {
        firstAvailColor += 1
      }
      labelColors[label] = colors[firstAvailColor]
      firstAvailColor += 1
    }

    borderColors.push(labelColors[label])
  })

  console.log(borderColors)

  const backgroundColors = borderColors.map((color) => (color += '33'))
  const hoverBackgroundColors = borderColors.map((color) => (color += '66'))

  return { backgroundColors, borderColors, hoverBackgroundColors }
}
