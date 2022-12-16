const { textFileToArray } = require('../utils')

const getStartOfMarker = (input, distinctChars) => {
  let startOfPacketMarker = 0
  for (let i = distinctChars-1; i < input.length; i++) {
    const testMarker = input.substr(i-(distinctChars-1), distinctChars)
    const uniqueChars = String.prototype.concat(...new Set(testMarker))
    if (uniqueChars.length === distinctChars) {
      startOfPacketMarker = i+1
      break
    }
  }
  return startOfPacketMarker
}

const input = textFileToArray('./input.txt')
console.log("Part 1", getStartOfMarker(input[0], 4))
console.log("Part 2", getStartOfMarker(input[0], 14))