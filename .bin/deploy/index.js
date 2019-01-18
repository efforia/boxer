#!/usr/bin/env node

/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const shell = require("shelljs");
const exec = shell.exec;
const path = require("path");
const fs = require("fs-extra");
const colors = require("colors");
const args = require("yargs").argv;
const env = require("../../.env/index");
const project = require("../../.mars/project");
const remote = `https://git.heroku.com/${project.codename + "-" + (args.prod ? "prod-server" : "dev-server")}.git`;
const gitPath = path.resolve(__dirname, "../../.git");

const build = async () => {
    console.log((`♂ Mars Server: Building...`.yellow));
    // Use this for commit based deploys
    console.log((`♂ Mars Socket: Generating commit...`.yellow));
    const commitMsg = "update(server): Atualização do servidor de aplicação.";
    await exec("git init");
    await exec("git add .");
    await exec(`git commit -m "${commitMsg}"`);
    await exec(`git push ${remote} master -f`);
    await fs.remove(gitPath);
    console.log((`♂ Mars Server: build deployed successfully!`.green));
    process.exit();
};

build();

