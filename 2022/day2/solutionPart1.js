const { textFileToArray } = require('../utils')

const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const ROCK_VALUES = ['A', 'X']
const PAPER_VALUES = ['B', 'Y']
const SCISSORS_VALUES = ['C', 'Z']

const RULES = {
  [ROCK]: { beats: SCISSORS, points: 1 },
  [PAPER]: { beats: ROCK, points: 2 },
  [SCISSORS]: { beats: PAPER, points: 3 },
  OUTCOME_POINTS: { win: 6, draw: 3, loss: 0 },
}

const determinePlay = (value) => {
  if (ROCK_VALUES.includes(value)) return ROCK
  if (PAPER_VALUES.includes(value)) return PAPER
  if (SCISSORS_VALUES.includes(value)) return SCISSORS
}

const determineOutcomePoints = (opponentPlay, yourPlay) => {
  if (opponentPlay === yourPlay) return RULES.OUTCOME_POINTS.draw
  if (RULES[yourPlay].beats === opponentPlay) return RULES.OUTCOME_POINTS.win
  return RULES.OUTCOME_POINTS.loss
}

const determineRoundPoints = (opponentPlay, yourPlay) => {
  let points = 0
  points += determineOutcomePoints(opponentPlay, yourPlay)
  points += RULES[yourPlay].points
  return points
}

const sumTotalPoints = (array) => {
  let totalPoints = 0
  array.forEach((play) => {
    const opponentPlay = determinePlay(play.split(' ')[0])
    const yourPlay = determinePlay(play.split(' ')[1])
    totalPoints += determineRoundPoints(opponentPlay, yourPlay)
  })
  return totalPoints
}

const plays = textFileToArray('./input.txt')
console.log(sumTotalPoints(plays))

