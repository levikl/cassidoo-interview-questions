export function scoreHand(cards: string[]) {
  if (cards.length !== 5) throw new Error('Input must be exactly 5 cards')

  if (!cards.every(arg => /^(A|2|3|4|5|6|7|8|9|10|J|Q|K)(C|D|H|S)$/.test(arg)))
    throw new Error('Input does not match expected format')

  const cardSubsets = getUniqueSubsets(cards)

  const fifteens = cardSubsets.filter(sumIs15)
  const pairs = cardSubsets.filter(isPair)
  const runs = dedupeRuns(cardSubsets.filter(isRun).sort((a, b) => b.length - a.length))

  const fifteensScore = fifteens.length * 2
  const pairsScore = pairs.length * 2
  const runsScore = runs.reduce((sum, run) => sum + run.length, 0)

  const total = fifteensScore + pairsScore + runsScore

  // const info = { fifteensScore, pairsScore, runsScore, fifteens, pairs, runs, total }
  // console.debug(info)

  return total
}

function isPair(cards: string[]) {
  if (cards.length !== 2) return false
  const [a, b] = cards
  return getRank(a) === getRank(b)
}

function isRun(cards: string[]) {
  if (cards.length < 3) return false

  const [_, isRun] = cards.map(getRank).reduce(
    ([prevRank, isRunCandidate], currentRank) => {
      if (!prevRank) return [currentRank, true]
      return [currentRank, isRunCandidate && prevRank + 1 === currentRank]
    },
    [0, true],
  )

  return isRun
}

function dedupeRuns(runs: string[][]): string[][] {
  if (runs.length < 2) return runs

  const [a, ...rest] = runs
  const deduped = rest.filter(b => !runContainsSmallerRun(a, b))

  return [a, ...dedupeRuns(deduped)]
}

function runContainsSmallerRun(a: string[], b: string[]) {
  if (b.length > a.length) return false

  for (let i = 0; i <= a.length - b.length; i++) {
    let dupe = true

    for (let j = 0; j < b.length; j++) {
      if (a[i + j] !== b[j]) {
        dupe = a.length > b.length ? runContainsSmallerRun(a.slice(1), b) : false
        break
      }
    }

    if (dupe) return true
  }

  return false
}

function getUniqueSubsets(cards: string[]): string[][] {
  const unique: Set<string> = new Set()

  function generateSubsets(subset: string[], start: number, span: number) {
    if (subset.length === span) return unique.add(subset.sort(sortByRankAndSuit).join(','))

    cards.forEach((card, i) => i >= start && generateSubsets([...subset, card], i + 1, span))
  }

  cards.forEach((_, n) => n > 1 && generateSubsets([], 0, n))

  return [...Array.from(unique).map(s => s.split(',')), [...cards]]
}

function getRank(input: string) {
  const rank = input.substring(0, input.length - 1)

  if (/^\d+$/.test(rank)) return +rank

  switch (rank) {
    case 'A':
      return 1
    case 'J':
      return 11
    case 'Q':
      return 12
    case 'K':
      return 13
    default:
      throw new Error(`Unsupported input for rank: ${rank}`)
  }
}

function sortByRankAndSuit(a: string, b: string) {
  return getRank(a) - getRank(b) || a.charAt(a.length - 1).localeCompare(b.charAt(b.length - 1))
}

function sumIs15(cards: string[]) {
  return cards.reduce((acc, card) => acc + getRank(card), 0) === 15
}

