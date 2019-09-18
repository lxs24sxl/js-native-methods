var fs = require('fs');

let PATH =  `${__dirname}/methods`;

const files = fs.readdirSync(PATH);

files.map(file => {
  require(`./methods/${file}`)
})


