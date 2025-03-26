// question src: https://buttondown.com/cassidoo/archive/take-your-victories-whatever-they-may-be-cherish/

import { expect, test } from 'vitest'

import { scoreHand } from '~/03-17-25'

test('scoreHand', () => {
  expect(scoreHand(['7H', '8C', '9D', 'JH', 'KS'])).toBe(5)
  expect(scoreHand(['AH', '2C', '3D', '4S', '5H'])).toBe(7)
})
