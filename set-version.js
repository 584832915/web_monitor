
var path = require('path');
var fs = require('fs');
const pkgPath = path.join(__dirname, 'package.json');
let pkg = fs.readFileSync(pkgPath);
pkg = JSON.parse(pkg);
const numberArr = pkg.version.split('.')
numberArr[2]++
const newVersion = numberArr.join('.')
pkg.version = newVersion
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
fs.writeFileSync(path.join(__dirname, 'src/base/version.json'),JSON.stringify({version:newVersion},null, 2))
