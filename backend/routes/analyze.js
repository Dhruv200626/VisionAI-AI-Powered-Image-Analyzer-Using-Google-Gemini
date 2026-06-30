const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {

    try {

        const { image, mimeType } = req.body;

        if (!image) {
            return res.status(400).json({
                message: "No image uploaded."
            });
        }

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: [

                {
                    inlineData: {
                        mimeType: mimeType,
                        data: image
                    }
                },

                {
                    text: `
Analyze this image or screenshot.

Return ONLY JSON.

{
"title":"",
"description":"",
"objects":[],
"text_found":"",
"summary":""
}
`
                }

            ]

        });

        let text = response.text;

        text = text.replace(/```json/g, "")
                   .replace(/```/g, "")
                   .trim();

        const result = JSON.parse(text);

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;