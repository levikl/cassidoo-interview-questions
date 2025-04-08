// question src: https://buttondown.com/cassidoo/archive/8-you-can-have-a-plan-but-you-have-to-be-flexible/

import { expect, test } from 'vitest'

function getLeylandNumbers(n: number) {
  function generateDomain() {
    if (n < 4) {
      return [
        [4, 2],
        [3, 2],
        [2, 2],
      ] satisfies [x: number, y: number][]
    }

    const domain: [x: number, y: number][] = []

    // this little ditty does not generate a sufficent domain for 2 <= n <= 3, hence above guard
    for (let x = 2; x <= n; x++) {
      for (let y = 2; y <= x; y++) {
        domain.push([x, y])
      }
    }

    return domain
  }

  function calculateLeyland([x, y]: [x: number, y: number]) {
    return Math.pow(x, y) + Math.pow(y, x)
  }

  return generateDomain()
    .map(calculateLeyland)
    .sort((a, b) => a - b)
    .slice(0, n)
}

test('getLeylandNumbers', () => {
  expect(getLeylandNumbers(1)).toEqual([8])
  expect(getLeylandNumbers(2)).toEqual([8, 17])
  expect(getLeylandNumbers(3)).toEqual([8, 17, 32])
  expect(getLeylandNumbers(4)).toEqual([8, 17, 32, 54])
  expect(getLeylandNumbers(5)).toEqual([8, 17, 32, 54, 57])
  expect(
    /* 42 === answer to the Ultimate Question of life, the universe, and everything */
    getLeylandNumbers(42).slice(0, -1),
  ).toEqual([
    /* src: https://oeis.org/A076980 */
    8, 17, 32, 54, 57, 100, 145, 177, 320, 368, 512, 593, 945, 1124, 1649, 2169, 2530, 4240, 5392,
    6250, 7073, 8361, 16580, 18785, 20412, 23401, 32993, 60049, 65792, 69632, 93312, 94932, 131361,
    178478, 262468, 268705, 397585, 423393, 524649, 533169, 1048976,
  ])
})
