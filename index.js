const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:input?", function(req, res) {
  const { input } = req.params;

  if (!input || /^\s*$/.test(input)) {
    // If there is no input or the input is empty, return today's date
    const today = new Date();
    const unixTimestamp = Math.floor(today.getTime() / 1);
    const utcDate = today.toUTCString();

    res.json({
      "unix": unixTimestamp,
      "utc": utcDate,
    });
  } else {
    let unixTimestamp;
    let utcDate;

    // Check if the input is a Unix timestamp (numeric string)
    if (/^\d+$/.test(input)) {
      unixTimestamp = parseInt(input, 10);
      utcDate = new Date(unixTimestamp * 1).toUTCString();
    }
    // Check if the input is a UTC date string (YYYY-MM-DD format)
    else if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      unixTimestamp = Date.parse(input + 'T00:00:00Z') * 1;
      utcDate = new Date(input + 'T00:00:00Z').toUTCString();
    } else {
      res.status(400).json({ error: "Invalid input" });
      return;
    }

    res.json({
      "unix": unixTimestamp,
      "utc": utcDate,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
