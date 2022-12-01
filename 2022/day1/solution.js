const { textFileToArray } = require('../utils')

const getTotalCaloriesByElf = (array) => {
  const totalCaloriesByElf = []
  let sumCalories = 0
  for (let index = 0; index < array.length; index++) {
    const value = array[index]
    if (!value) {
      totalCaloriesByElf.push(sumCalories)
      sumCalories = 0
      continue
    }
    sumCalories += Number(value)
    if (index === array.length-1) totalCaloriesByElf.push(sumCalories)
  }
  return totalCaloriesByElf
}

const getElfWithMostCalories = (array) => {
  const mostCalories = Math.max(...array)
  const indexOfElfWithMostCalories = array.indexOf(mostCalories)
  return { index: indexOfElfWithMostCalories, calories: mostCalories }
}

const getTop3Elves = (array) => {
  const elvesOrderedByMostCalories = array.sort((a, b) => b > a ? 1 : -1)
  return elvesOrderedByMostCalories.slice(0, 3)
}

const elvesCalories = textFileToArray('./input.txt')
const totalCaloriesByElf = getTotalCaloriesByElf(elvesCalories)
const elfWithMostCalories = getElfWithMostCalories(totalCaloriesByElf)
const top3Elves = getTop3Elves(totalCaloriesByElf)
const sumTop3Elves = top3Elves.reduce((accum, value) => accum + value)

console.log("Part 1", elfWithMostCalories)
console.log("Part 2", sumTop3Elves)

