const { textFileToArray } = require('../utils')

const navigation = []
const folderTree = {}

const getAbsolutePath = () => navigation.join('/')

const processCd = (argument) => {
  switch (argument) {
    case '..':
      if (navigation.length > 1) navigation.pop()
      break
    case '/':
      navigation.splice(0)
      navigation.push('/')
      break
    default:
      navigation.push(argument)
      break
  }
}

const parseCommand = (input) => {
 const [command, argument] = input.substr(2).split(' ')
 switch (command) {
  case 'cd':
    processCd(argument) 
    break
  default:
    break
 }
}

const parseOutput = (input) => {
  const [value, identifier] = input.split(' ')
  if (!folderTree[getAbsolutePath()]) folderTree[getAbsolutePath()] = []
  switch (value) {
    case 'dir':
      folderTree[getAbsolutePath()].push({ type: 'dir', identifier: getAbsolutePath()+'/'+identifier})
      break
    default:
      folderTree[getAbsolutePath()].push({ type: 'file', identifier, size: Number(value) })
      break
  }
}

const parseInput = (inputs) => {
  inputs.forEach((input) => {
    if (input.substr(0,1) === '$') {
      parseCommand(input)
    } else {
      parseOutput(input)
    }
  })
}

const getDirTotalSize = (absolutePath) => {
  const dir = folderTree[absolutePath]
  let total = 0
  dir.forEach((element) => {
    if (element.type === 'dir') {
      total += getDirTotalSize(element.identifier)
    } else {
      total += element.size
    }
  })
  return total
}

const getFolderTreeSizes = (folderTree) => {
  const response = []
  for (const [dir] of Object.entries(folderTree)) {
    const totalSize = getDirTotalSize(dir)
    response.push({ dir, totalSize }) 
  }
  return response
}

const filterDirsWithMaxSize = (dirs, maxSize) => dirs.filter((dir) => dir.totalSize <= maxSize)

const filterDirsWithMinSize = (dirs, minSize) => dirs.filter((dir) => dir.totalSize >= minSize)

const getSumSizesOfDirs = (dirs) => dirs.reduce((a, b) => a + b)

const input = textFileToArray('./input.txt')
parseInput(input) // this will mutate folderTree

const folderTreeSizes = getFolderTreeSizes(folderTree)

//Solution Part 1
const filteredDirs = filterDirsWithMaxSize(folderTreeSizes, 100000)
console.log("Part 1", getSumSizesOfDirs(filteredDirs.map((dir) => dir.totalSize)))

//Solution Part 2
const totalDiskSpace = 70000000
const totalNeededSpaceForUpdate = 30000000
const totalUsedSpace = folderTreeSizes.filter(({ dir }) => dir === '/')[0].totalSize
const freeSpace = totalDiskSpace - totalUsedSpace
const neededSpace = totalNeededSpaceForUpdate - freeSpace
const dirToDelete = filterDirsWithMinSize(folderTreeSizes, neededSpace).sort((a, b) => a.totalSize - b.totalSize)[0]
console.log("Part 1", dirToDelete)