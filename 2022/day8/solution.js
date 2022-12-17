const { textFileToArray } = require('../utils')

const isTreeVisibleFromTheLeft = (tree, matrix, i, j) => {
  const treesInRow = matrix.find((value, index) => index === i)
  const treesToTheLeft = treesInRow.filter((value, index) => index < j)
  const areHigherTreesToTheLeft = treesToTheLeft.find((value) => value >= tree)
  return !areHigherTreesToTheLeft
}

const isTreeVisibleFromTheRight = (tree, matrix, i, j) => {
  const treesInRow = matrix.find((value, index) => index === i)
  const treesToTheRight = treesInRow.filter((value, index) => index > j)
  const areHigherTreesToTheRight = treesToTheRight.find((value) => value >= tree)
  return !areHigherTreesToTheRight
}

const isTreeVisibleFromAbove = (tree, matrix, i, j) => {
  const treesAbove = matrix.filter((value, index) => index < i).map((row) => row[j])
  const areHigherTreesAbove = treesAbove.find((value) => value >= tree)
  return !areHigherTreesAbove
}

const isTreeVisibleFromBelow = (tree, matrix, i, j) => {
  const treesBelow = matrix.filter((value, index) => index > i).map((row) => row[j])
  const areHigherTreesBelow = treesBelow.find((value) => value >= tree)
  return !areHigherTreesBelow
}

const getVisibleTreesInMatrix = (matrix) => {
  let visibleTrees = matrix.length*2 + ((matrix[0].length-2)*2)
  for (let i = 1; i < matrix.length-1; i++) {
    for (let j = 1; j < matrix[i].length-1; j++) {
      const tree = matrix[i][j]
      if (isTreeVisibleFromTheLeft(tree, matrix, i, j)
      || isTreeVisibleFromTheRight(tree, matrix, i, j)
      || isTreeVisibleFromAbove(tree, matrix, i, j)
      || isTreeVisibleFromBelow(tree, matrix, i, j)) {
        visibleTrees += 1
      } 
    }
  }
  return visibleTrees
}

const getVisibleTreesToTheLeft = (tree, matrix, i, j) => {
  let visibleTreesToTheLeft = 0
  if (j === 0) return visibleTreesToTheLeft
  const treesInRow = matrix.find((value, index) => index === i)
  const treesToTheLeft = treesInRow.filter((value, index) => index < j)
  for (let index = j-1; index >= 0; index--) {
    visibleTreesToTheLeft += 1
    if (treesToTheLeft[index] >= tree) break
  }
  return visibleTreesToTheLeft
}

const getVisibleTreesToTheRight = (tree, matrix, i, j) => {
  let visibleTreesToTheRight = 0
  if (j === matrix[i].length-1) return visibleTreesToTheRight
  const treesInRow = matrix.find((value, index) => index === i)
  const treesToTheRight = treesInRow.filter((value, index) => index > j)
  for (let index = 0; index < treesToTheRight.length; index++) {
    visibleTreesToTheRight += 1
    if (treesToTheRight[index] >= tree) break
  }
  return visibleTreesToTheRight
}

const getVisibleTreesAbove = (tree, matrix, i, j) => {
  let visibleTreesAbove = 0
  if (j === 0) return visibleTreesAbove
  const treesAbove = matrix.filter((value, index) => index < i).map((row) => row[j])
  for (let index = i-1; index >= 0; index--) {
    visibleTreesAbove += 1
    if (treesAbove[index] >= tree) break
  }
  return visibleTreesAbove
}

const getVisibleTreesBelow = (tree, matrix, i, j) => {
  let visibleTreesBelow = 0
  if (j === 0) return visibleTreesBelow
  const treesBelow = matrix.filter((value, index) => index > i).map((row) => row[j])
  for (let index = 0; index < treesBelow.length; index++) {
    visibleTreesBelow += 1
    if (treesBelow[index] >= tree) break
  }
  return visibleTreesBelow
}

const getHighestScenicScoreInMatrix = (matrix) => {
  let highestScenicScore = 0
  for (let i = 0; i < matrix.length-1; i++) {
    for (let j = 0; j < matrix[i].length-1; j++) {
      const tree = matrix[i][j]
      const scenicScore = getVisibleTreesToTheLeft(tree, matrix, i, j)
        * getVisibleTreesToTheRight(tree, matrix, i, j)
        * getVisibleTreesAbove(tree, matrix, i, j)
        * getVisibleTreesBelow(tree, matrix, i, j)
      if (scenicScore > highestScenicScore) highestScenicScore = scenicScore
    }
  }
  return highestScenicScore
}

const input = textFileToArray('./input.txt')
const inputMatrix = input.map((i) => i.split(''))
console.log("Part 1", getVisibleTreesInMatrix(inputMatrix))
console.log("Part 2", getHighestScenicScoreInMatrix(inputMatrix))