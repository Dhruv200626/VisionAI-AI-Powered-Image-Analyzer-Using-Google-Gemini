require("dotenv").config();

const express = require("express");
const cors = require("cors");

const analyzeRoute = require("./routes/analyze");

const app = express();

app.use(cors());

app.use(express.json({
    limit: "20mb"
}));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Image Analyzer Backend Running"
    });
});

app.use("/api/analyze", analyzeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});