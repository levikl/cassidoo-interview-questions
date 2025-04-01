// question src: https://buttondown.com/cassidoo/archive/it-is-never-too-late-to-be-what-you-might-have/

import { expect, test } from 'vitest'

const VALID_TIMESTAMP_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/

function findLongestTimeGap(input: string[]) {
  const [longest] = input
    .map((timestamp: string) => {
      if (!VALID_TIMESTAMP_REGEX.test(timestamp)) throw new Error(`Invalid format: ${timestamp}`)

      const [hours, minutes] = timestamp.split(':').map(n => +n)
      return hours * 60 + minutes
    })
    .sort((a, b) => a - b)
    .reduce<[number, number | null]>(
      ([longestGap, prevTime], currentTime) => {
        if (prevTime === null) return [0, currentTime]

        const currentGap = currentTime - prevTime
        return [Math.max(longestGap, currentGap), currentTime]
      },
      [0, null],
    )

  return longest
}

test('findLongestTimeGap', () => {
  expect(findLongestTimeGap(['12:00'])).toBe(0)
  expect(findLongestTimeGap(['09:00', '11:00'])).toBe(120)
  expect(findLongestTimeGap(['14:00', '09:00', '15:00', '10:30'])).toBe(210)
  expect(findLongestTimeGap(['08:00', '10:00', '10:00', '14:00'])).toBe(240)
})
