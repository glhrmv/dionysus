const path = require("path");
var express = require("express");
var youtubedl = require("youtube-dl");

var router = express.Router();

const options = {
  cwd: path.join(__dirname, "../public/audio"),
};

// GET /
router.get("/", (req, res) => {
  res.render("index");
});

// POST /
router.post("/", (req, res, next) => {
  const videoId = parseVideoId(req.body.videoUrl);

  youtubedl.exec(
    req.body.videoUrl,
    ["--extract-audio", "--audio-format", "mp3", "-o", "%(id)s.%(ext)s"],
    options,
    (err, output) => {
      if (err) next(err);

      // console.log(output.join("\n"));
      res.redirect("/audio?id=" + videoId);
    }
  );
});

router.get("/audio", (req, res, next) => {
  if (!req.query.id)
    res.redirect("/");

  res.render("audio", { id: req.query.id });
});

// Taken from: https://stackoverflow.com/a/8260383/6304441
// Parses video ID from YouTube video URL
const parseVideoId = (url) => {
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
};

module.exports = router;
