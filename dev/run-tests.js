#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const partition = require('./partition')

const fileNameReg = /\.test\.js$/
const colorReset = '\x1b[0m'
const green = '\x1b[32m'
const applyColor = color => text => color + text + colorReset
const success = applyColor(green, '✓')

const testDirectory = (directory, indent="") => {
  const relativeDirName = path.relative(__dirname, directory)
  const dirEntries = fs.readdirSync(directory)

  const [ directories, files ] = partition(dirEntries, (entry) => {
    fs.lstatSync(`${__dirname}/${entry}`).isDirectory()
  })

  const testFiles = files.filter(file =>
    fileNameReg.test(file)
  )
  if (testFiles.length) {
    console.log(`${indent}/${path.basename(directory)}`)
    testFiles.forEach(file => {
      require(`./${file}`)
      const testName = path.join(
        relativeDirName,
        path.basename(file, '.test.js')
      )
      console.log(`${indent}  ${success} ${testName}`)
    })
    console.log()
  }

  directories.forEach((dir) => {
    testDirectory(`${__dirname}/${entry}`, indent + "  ")
  })
}

testDirectory(__dirname)
console.log('🙌  all good!')
