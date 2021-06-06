const fs = require("fs");
const path = require("path");
const express = require("express");
const youtubedl = require("youtube-dl-exec");

const router = express.Router();

const audioFolder = path.join(__dirname, "../public/audio");

// GET /
router.get("/", (req, res) => {
  res.render("index");
});

// POST /
router.post("/", (req, res, next) => {
  const videoId = parseVideoId(req.body.videoUrl);

  if (!fs.existsSync(audioFolder)) fs.mkdirSync(audioFolder);

  // If we already have this video downloaded, just redirect to audio page
  if (fs.existsSync(path.join(audioFolder, `${videoId}.mp3`)))
    return res.redirect("/audio?id=" + videoId);

  const args = [
    "--extract-audio",
    "--audio-format",
    "mp3",
    "-o",
    "%(id)s.%(ext)s",
  ];

  const options = {
    cwd: audioFolder,
  };

  // Download the video
  youtubedl(req.body.videoUrl, args, options, (err, output) => {
    if (err) return next(err);

    // Everything went well, redirect to audio
    return res.redirect("/audio?id=" + videoId);
  });
});

// GET /audio
router.get("/audio", async (req, res, next) => {
  // Expect id field in query string
  if (!req.query.id) return res.redirect("/");

  // If video with specified id has not been downloaded, redirect back to index
  if (
    !fs.existsSync(
      path.join(__dirname, "..", `/public/audio/${req.query.id}.mp3`),
    )
  )
    return res.redirect("/");

  // Found the mp3, render audio page
  return res.render("audio", { id: req.query.id });
});

// Taken from: https://stackoverflow.com/a/8260383/6304441
// Parses video ID from YouTube video URL
const parseVideoId = (url) => {
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
};

module.exports = router;
