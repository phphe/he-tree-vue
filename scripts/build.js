const { execSync } = require('child_process');
const {originalBuilds} = require('./config')
const fs = require('fs');

for (const key in originalBuilds) {
  const cmd = `bili -c scripts/config.js -- --target ${key}`
  console.log(cmd);
  console.log(execSync(cmd).toString());
}

// keep only [name].css
fs.readdirSync('./dist').forEach(fileName => {
  if (fileName.match(/\.\w+\.css$/)) {
    const filePath = `./dist/${fileName}`
    console.log(`Remove: ${filePath}`);
    fs.unlinkSync(filePath)
  }
})
