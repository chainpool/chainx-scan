const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");

const client = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "",
  accessKeySecret: "",
  bucket: "chainx-scan-leo"
});

const filePathRoot = path.resolve(__dirname, "./build");

const files = [];

function readDirSync(filePath) {
  const filePaths = fs.readdirSync(filePath);
  filePaths.forEach(item => {
    if (item === ".DS_Store") {
      return;
    }

    const curPath = `${filePath}/${item}`;
    const info = fs.statSync(curPath);
    if (info.isDirectory()) {
      readDirSync(curPath);
    } else {
      files.push(curPath);
    }
  });
}

readDirSync(filePathRoot);

async function upload() {
  for (let path of files) {
    const result = await client.put(path.replace(filePathRoot, ""), path);
    if (result.res.status === 200) {
      console.log(`${result.name} upload successfully`);
    }
  }
}

upload();
