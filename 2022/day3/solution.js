const { textFileToArray } = require('../utils')

const getCommonItemsBetweenArrays = (arrays) => {
  const baseArray = []
  for (let index = 0; index < arrays.length; index++) {
    baseArray.push(...new Set(arrays[index]))
  }
  const itemsCount = baseArray.reduce((acc, item) => acc.set(item, (acc.get(item) || 0) + 1), new Map())
  let commonItems = [...itemsCount.entries()]
    .filter(({ 1: count }) => count === arrays.length)
    .map(([item]) => item)
  return commonItems
}

const splitItems = (items) => {
  const middle = Math.floor(items.length / 2)
  return [items.substr(0, middle), items.substr(middle)]
}

const getCommonItemsInRucksackCompartments = (ruckSacks) => {
  let itemsInCommon = []
  ruckSacks.forEach((items) => {
    const compartments = splitItems(items)
    const commonItem = getCommonItemsBetweenArrays(compartments)
    itemsInCommon.push(...commonItem)
  })
  return itemsInCommon
}

const getCommonItemsInElvesGroups = (groupedRucksacks) => {
  let itemsInCommon = []
  groupedRucksacks.forEach((rucksacks) => {
    const commonItem = getCommonItemsBetweenArrays(rucksacks)
    itemsInCommon.push(...commonItem)
  })
  return itemsInCommon
}

const getItemValue = (item) => {
  const offset = item === item.toUpperCase() ? 27-'A'.charCodeAt() : 1-'a'.charCodeAt() 
  return item.charCodeAt()+offset
}

const sumItemsValues = (items) => {
  let totalItemsValues = 0
  items.forEach((item) => totalItemsValues += getItemValue(item))
  return totalItemsValues
}

const groupRucksacks = (rucksacks, groupBy) => {
  const groupedRucksacks = []
  for (let i = 0; i < rucksacks.length; i += groupBy) groupedRucksacks.push(rucksacks.slice(i, i + groupBy))
  return groupedRucksacks
}

const rucksacks = textFileToArray('./input.txt')
const commonItemsInRucksackCompartments = getCommonItemsInRucksackCompartments(rucksacks)
console.log("Part 1", sumItemsValues(commonItemsInRucksackCompartments))

const groupedRucksacks = groupRucksacks(rucksacks, 3)
const commonItemsElvesGroups = getCommonItemsInElvesGroups(groupedRucksacks)
console.log("Part 2", sumItemsValues(commonItemsElvesGroups))