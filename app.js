const chalk = require("chalk");
const getRepoInfo = require("git-repo-info");

const config = require("./config.json");

async function main() {

    const sleep = waitTimeInMs =>
        new Promise(resolve => setTimeout(resolve, waitTimeInMs));

    // No locales in standard node, so we just help ourselves
    const pad = n => n < 10 ? "0" + n : n;
    const germanDate = date => `${pad(date.getDate())}.${pad(date.getMonth())}.${date.getFullYear()} `
        + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

    while (true) {
        console.clear();

        for (let repo of config.repositories) {
            const info = getRepoInfo(repo.path);

            console.log("       ", chalk.greenBright(repo.name));
            console.log(chalk.green("Path:  "), repo.path);
            console.log(chalk.green("Branch:"), chalk.bold(info.branch));
            console.log(chalk.green("Date:  "), germanDate(new Date(info.committerDate)));
            console.log(chalk.green("Text:  "), info.commitMessage.slice(0, config.maxLength));
            console.log(chalk.green("Author:"), info.committer);
            console.log(chalk.green("SHA:   "), info.sha);
            console.log();
        }

        await sleep(config.refresh);
    }
}

main();
