import fs from "fs";

console.info("---Data start---");
console.info(JSON.stringify(fs.readdirSync("./images/", {withFileTypes: true}).map((dirent: fs.Dirent) => `data:image/png;base64,${fs.readFileSync(`./images/${dirent.name}`).toString("base64")}`)));
console.info("---Data end---");