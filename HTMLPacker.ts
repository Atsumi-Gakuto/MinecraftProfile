import fs from "fs";
import readline from "readline";

/**
 * 統合対象のファイルを1つのHTMLファイルに統合する。
 */
async function packHTML(): Promise<void> {
    const writeStream: fs.WriteStream = fs.createWriteStream("./output.html", {encoding: "utf-8"});
    for await (const line of readline.createInterface({input: fs.createReadStream("./index.html", {encoding: "utf-8"}), output: writeStream})) {
        /**
         * タグが参照するファイルの内容を挿入する。
         * @param {string} source ソースファイルのパス
         * @param {string} tagName タグ名
         * @param {number} tabIndent タブインデントの数
         */
        function pushTagSource(source: string, tagName: string, tabIndent: number): Promise<unknown> {
            return new Promise((resolve: (value?: null) => unknown) => {
                const tagReadLineInterface: readline.Interface = readline.createInterface({input: fs.createReadStream(source, {encoding: "utf-8"})});
                writeStream.write(`${"\t".repeat(tabIndent)}<${tagName}>\n`);
                tagReadLineInterface.addListener("line", (scriptLine: string) => writeStream.write(`${"\t".repeat(tabIndent + 1)}${scriptLine}\n`));
                tagReadLineInterface.addListener("close", () => {
                    writeStream.write(`${"\t".repeat(tabIndent)}</${tagName}>\n`);
                    resolve();
                });
            });
        }

        if(/<script src=".+\.js"><\/script>/.exec(line)) {
            //javascript
            await pushTagSource(/(?<=src=").+\.js(?=")/.exec(line)?.toString() as string, "script", 2);
        }
        else if(/<link rel="stylesheet" href=".+\.css">/.exec(line)) {
            //スタイルシート
            await pushTagSource(/(?<=href=").+\.css(?=")/.exec(line)?.toString() as string, "style", 2);
        }
        else writeStream.write(`${line}\n`);
    }
}

packHTML();