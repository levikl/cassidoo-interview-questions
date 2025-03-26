// question src: https://buttondown.com/cassidoo/archive/this-present-moment-was-once-the-unimaginable/

import { expect, test } from 'vitest'

function findLongestStreak(input: boolean[], goal: number) {
  const [longest] = input.reduce(
    ([longestStreak, prevStreak], currentElement) => {
      const currentStreak = currentElement === false ? 0 : prevStreak + 1

      return [Math.max(longestStreak, currentStreak), currentStreak]
    },
    [0, 0],
  )

  return longest >= goal ? longest : 0
}

test('findLongestStreak', () => {
  expect(findLongestStreak([true], 2)).toBe(0)
  expect(findLongestStreak([true], 1)).toBe(1)
  expect(findLongestStreak([false], 2)).toBe(0)
  expect(findLongestStreak([false], 1)).toBe(0)
  expect(findLongestStreak([true, true], 1)).toBe(2)
  expect(findLongestStreak([true, false], 2)).toBe(0)
  expect(findLongestStreak([true, true, false, true, true, true], 3)).toBe(3)
  expect(findLongestStreak([true, true, true, true, false, true], 3)).toBe(4)
  expect(findLongestStreak([false, true, true, true, false, false], 3)).toBe(3)
  expect(findLongestStreak([false, true, true, false, false], 3)).toBe(0)
  expect(findLongestStreak([true, true, true, false, true], 4)).toBe(0)
  expect(findLongestStreak([true, true, true, true], 2)).toBe(4)
})
