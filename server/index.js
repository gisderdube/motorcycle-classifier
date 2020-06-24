const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const server = express();
const { spawn } = require("child_process");

server.use(cors());

server.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../tmp"),
  })
);

server.use(express.static(path.join(__dirname, "public", "app")));

server.get("/", (req, res) => {
  res.send("hello from the classifier");
});

server.post("/classify", async (req, res) => {
  const classification = (await classify(req.files.file.tempFilePath)).split(
    "\n"
  )[1];
  res.send({ classification });
});

function classify(imagePath) {
  return new Promise((resolve, reject) => {
    const pyprog = spawn(
      process.env.PYTHON_PATH || "python",
      [path.join(__dirname, "./classify.py")],
      {
        env: {
          IMAGE_PATH: imagePath,
        },
      }
    );

    let d = "";
    pyprog.stdout.on("data", function (data) {
      d += data.toString();
    });

    pyprog.addListener("close", function () {
      resolve(d);
    });

    pyprog.stderr.on("data", (data) => {
      console.error(data.toString());
      reject(data.toString());
    });
  });
}

server.use((req, res) => res.redirect("/"));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Classification server listening at http://localhost:" + port);
});
