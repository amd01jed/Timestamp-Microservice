const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Assuming your HTML and CSS files are in a 'public' folder

app.get("/api/:nuix",function(req,res){
  res.json({
    "unix": req.params.nuix,
    "utc": utc = new Date(req.params.nuix * 1000).toUTCString()
  });
})

app.get("/api2/:utc",function(req,res){
  res.json({
    "unix": unix = Date.parse(req.params.utc + 'T00:00:00Z') / 1000,
    "utc": req.params.utc,
  });
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
