const { textFileToArray } = require('../utils')

class CrateMover9000 {
  buildStacks = (stacksInput) => {
    const stacks = []
    stacksInput.forEach((string) => {
      const crates = string.match(/.{1,4}/g)
      crates.forEach((crate, index) => {
        const parsedCrate = crate.replace(/[^A-Z]+/g, '')
        if (!!parsedCrate) {
          stacks[index] = !!stacks[index] ? [parsedCrate, ...stacks[index]] : [parsedCrate]
        }
      })
    })
    return stacks
  }

  parseMoveInput = (moveInput) => moveInput.replace(/[^0-9]+/g, ',').substr(1).split(',')

  getLastCratesForStacks = (stacks) => {
    let response = ''
    for (const stack of stacks) {
      response += stack.slice(stack.length-1)
    }
    return response
  }

  moveCrates = (stacksInput, movesInput) => {
    const stacks = this.buildStacks(stacksInput)
    movesInput.forEach((moveInput) => {
      const [move, from, to] = this.parseMoveInput(moveInput)
      for (let index = 0; index < move; index++) {
        const stackToMove = stacks[from-1].splice(stacks[from-1].length-1)
        stacks[to-1].push(...stackToMove)
      }
    })
    return stacks
  }
}

class CrateMover9001 extends CrateMover9000 {
  moveCrates = (stacksInput, movesInput) => {
    const stacks = this.buildStacks(stacksInput)
    movesInput.forEach((moveInput) => {
      const [move, from, to] = this.parseMoveInput(moveInput)
      const stacksToMove = stacks[from-1].splice(stacks[from-1].length-move)
      stacks[to-1].push(...stacksToMove)
    })
    return stacks
  }
}

const stacksInput = textFileToArray('./stacks-input.txt')
const movesInput = textFileToArray('./moves-input.txt')

const crateMover9000 = new CrateMover9000()
const rearrengedStacks = crateMover9000.moveCrates(stacksInput, movesInput)
console.log("Part 1", crateMover9000.getLastCratesForStacks(rearrengedStacks))

const crateMover9001 = new CrateMover9001()
const rearrengedStacks9001 = crateMover9001.moveCrates(stacksInput, movesInput)
console.log("Part 2", crateMover9001.getLastCratesForStacks(rearrengedStacks9001))