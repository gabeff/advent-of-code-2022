const { readFileSync } = require('fs')

const textFileToArray = (filename) => {
  const values = readFileSync(filename, 'utf-8')
  return values.split(/\r?\n/)
}

module.exports = {
  textFileToArray
}