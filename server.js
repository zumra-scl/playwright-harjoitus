const express = require("express");
const app = express();
app.use(express.static("public"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
