const { textFileToArray } = require('../utils')

const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const ROCK_VALUES = ['A']
const PAPER_VALUES = ['B']
const SCISSORS_VALUES = ['C']
const LOSS = 'X'
const DRAW = 'Y'
const WIN = 'Z'

const RULES = {
  [ROCK]: { beats: SCISSORS, losesTo: PAPER, points: 1 },
  [PAPER]: { beats: ROCK, losesTo: SCISSORS, points: 2 },
  [SCISSORS]: { beats: PAPER, losesTo: ROCK, points: 3 },
  OUTCOME_POINTS: { [WIN]: 6, [DRAW]: 3, [LOSS]: 0 },
}

const determinePlay = (value) => {
  if (ROCK_VALUES.includes(value)) return ROCK
  if (PAPER_VALUES.includes(value)) return PAPER
  if (SCISSORS_VALUES.includes(value)) return SCISSORS
}

const determineOutcomePoints = (opponentPlay, yourPlay) => {
  if (opponentPlay === yourPlay) return RULES.OUTCOME_POINTS[DRAW]
  if (RULES[yourPlay].beats === opponentPlay) return RULES.OUTCOME_POINTS[WIN]
  return RULES.OUTCOME_POINTS[LOSS]
}

const determineRoundPoints = (opponentPlay, yourPlay) => {
  let points = 0
  points += determineOutcomePoints(opponentPlay, yourPlay)
  points += RULES[yourPlay].points
  return points
}

const determineYourPlay = (opponentPlay, outcomeDesire) => {
  if (outcomeDesire === WIN) return RULES[opponentPlay].losesTo
  if (outcomeDesire === DRAW) return opponentPlay
  return RULES[opponentPlay].beats
}

const sumTotalPoints = (array) => {
  let totalPoints = 0
  array.forEach((play) => {
    const opponentPlay = determinePlay(play.split(' ')[0])
    const outcomeDesire = play.split(' ')[1]
    const yourPlay = determineYourPlay(opponentPlay, outcomeDesire)
    totalPoints += determineRoundPoints(opponentPlay, yourPlay)
  })
  return totalPoints
}

const plays = textFileToArray('./input.txt')
console.log(sumTotalPoints(plays))

