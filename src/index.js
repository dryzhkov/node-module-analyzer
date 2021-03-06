const fs = require("fs");
const json = require("big-json");
const outDotFilePath = "out.dot";
const outSvgFilePath = "out.svg";
const { exec } = require("child_process");

module.exports = filePath => {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found. ${filePath}`);
  }

  let readStream = fs.createReadStream(filePath);
  let parseStream = json.createParseStream();

  parseStream.on("data", pojo => {
    processData(pojo);
    generateSVG();
  });

  readStream.pipe(parseStream);
};

const processData = pojo => {
  let depsCount = 0;
  let devDepsCount = 0;
  let writeStream = fs.createWriteStream(outDotFilePath);
  writeStream.write("digraph G {\n");
  Object.keys(pojo.dependencies).forEach((value, index) => {
    if (pojo.dependencies[value].dev) {
      devDepsCount++;
      // skip dev deps
      return;
    }
    depsCount++;
    let requires = pojo.dependencies[value].requires;
    if (requires !== undefined) {
      // has 1 or more dependencies
      Object.keys(requires).forEach(dep => {
        writeStream.write(`"${value}" -> "${dep}"\n`);
      });
    } else {
      // no deps, leaf node
      writeStream.write(`"${value}"\n`);
    }
  });

  console.log(
    `${
      pojo.name
    } has ${depsCount} dependencies.\nWriting results to ${outDotFilePath}`
  );

  writeStream.write("}");
};

const generateSVG = () => {
  console.log("creating " + outSvgFilePath);
  exec("dot -Tsvg " + outDotFilePath + " -o " + outSvgFilePath);
};
