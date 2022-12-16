const { textFileToArray } = require('../utils')

const areSectionsFullyOverlapping = (firstPair, secondPair) => {
  const [firstPairStartingSection, firstPairEndingSection] = firstPair.split('-')
  const [secondPairStartingSection, secondPairEndingSection] = secondPair.split('-')
  if (
    Number(firstPairStartingSection) >= Number(secondPairStartingSection) 
    && Number(firstPairEndingSection) <= Number(secondPairEndingSection)
  ) {
    return true
  }
  if (
    Number(secondPairStartingSection) >= Number(firstPairStartingSection) 
    && Number(secondPairEndingSection) <= Number(firstPairEndingSection)
  ) {
    return true
  }
  return false
}

const getFullyOverlappingSections = (pairs) => {
  let totalFullOverlaps = 0
  pairs.forEach((pair) => {
    const [firstPair, secondPair] = pair.split(',')
    if (areSectionsFullyOverlapping(firstPair, secondPair)) {
      totalFullOverlaps++
    }
  })
  return totalFullOverlaps
}

const areSectionsOverlapping = (firstPair, secondPair) => {
  const [firstPairStartingSection, firstPairEndingSection] = firstPair.split('-')
  const [secondPairStartingSection, secondPairEndingSection] = secondPair.split('-')
  if (
    Number(firstPairStartingSection) >= Number(secondPairStartingSection) 
    && Number(firstPairStartingSection) <= Number(secondPairEndingSection)
  ) {
    return true
  }
  if (
    Number(firstPairEndingSection) >= Number(secondPairStartingSection) 
    && Number(firstPairEndingSection) <= Number(secondPairEndingSection)
  ) {
    return true
  }
  if (Number(secondPairStartingSection) >= Number(firstPairStartingSection) 
    && Number(secondPairStartingSection) <= Number(firstPairEndingSection)
  ) {
    return true
  }
  if (Number(secondPairEndingSection) >= Number(firstPairStartingSection) 
    && Number(secondPairEndingSection) <= Number(firstPairEndingSection)
  ) {
    return true
  }
  return false
}

const getOverlappingSections = (pairs) => {
  let totalOverlaps = 0
  pairs.forEach((pair) => {
    const [firstPair, secondPair] = pair.split(',')
    if (areSectionsOverlapping(firstPair, secondPair)) {
      totalOverlaps++
    }
  })
  return totalOverlaps
}

const pairSections = textFileToArray('./input.txt')
console.log("Part 1", getFullyOverlappingSections(pairSections))
console.log("Part 2", getOverlappingSections(pairSections))