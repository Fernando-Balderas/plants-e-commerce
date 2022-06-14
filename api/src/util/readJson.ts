// @ts-ignore
'use strict'

import fs from 'fs'

function readJson() {
  const file = './src/util/trees.json'
  let trees = []

  // console.log(`Current directory: ${process.cwd()}`)
  try {
    const rawdata = fs.readFileSync(file)
    trees = JSON.parse(rawdata.toString())
  } catch (error) {
    console.log(error)
  }
  return trees
}

export default readJson
