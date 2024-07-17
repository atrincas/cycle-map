const fs = require('fs')

const FROM_PATH = 'src/lib/data/countries.json'
const TO_PATH = 'src/lib/data/countriesMap.json'

var obj = JSON.parse(fs.readFileSync(FROM_PATH, 'utf8'))

let countriesMap = {}

obj.data.forEach(({ value, label }) => (countriesMap[value] = label))

fs.writeFileSync(TO_PATH, JSON.stringify(countriesMap, null, 2))

console.log(`Generate new countriesMap and saved at ${TO_PATH}`)
