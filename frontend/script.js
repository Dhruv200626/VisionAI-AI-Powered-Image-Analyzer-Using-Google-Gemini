// ======================================
// DOM ELEMENTS
// ======================================

const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const themeBtn = document.querySelector(".theme");

let selectedFile = null;

// ======================================
// CLICK TO UPLOAD
// ======================================

dropArea.addEventListener("click", () => {
    imageInput.click();
});

// ======================================
// FILE SELECT
// ======================================

imageInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    showPreview(file);

});

// ======================================
// DRAG EVENTS
// ======================================

dropArea.addEventListener("dragover", (e) => {

    e.preventDefault();

    dropArea.style.borderColor = "#FFD54F";
    dropArea.style.background = "rgba(255,255,255,.18)";

});

dropArea.addEventListener("dragleave", () => {

    dropArea.style.borderColor = "rgba(255,255,255,.4)";
    dropArea.style.background = "rgba(255,255,255,.12)";

});

dropArea.addEventListener("drop", (e) => {

    e.preventDefault();

    dropArea.style.borderColor = "rgba(255,255,255,.4)";
    dropArea.style.background = "rgba(255,255,255,.12)";

    const file = e.dataTransfer.files[0];

    if (!file) return;

    showPreview(file);

});

// ======================================
// SHOW PREVIEW
// ======================================

function showPreview(file){

    selectedFile = file;

    const reader = new FileReader();

    reader.onload = function(e){

        preview.src = e.target.result;
        preview.style.display = "block";
        preview.classList.add("fade-in");

    };

    reader.readAsDataURL(file);

}

// ======================================
// DARK MODE
// ======================================

let darkMode = false;

themeBtn.addEventListener("click", () => {

    darkMode = !darkMode;

    if(darkMode){

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e293b,#111827)";

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }else{

        document.body.style.background =
        "linear-gradient(135deg,#6C7BFF,#5B6EF5,#4A63F2)";

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

// ======================================
// PLACEHOLDER
// ======================================

analyzeBtn.addEventListener("click", () => {

    if(!selectedFile){

        alert("Please upload an image first.");

        return;

    }

    alert("Next step: AI Analysis");

});

// ======================================
// AI ANALYSIS
// ======================================

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const title = document.getElementById("title");
const description = document.getElementById("description");
const objects = document.getElementById("objects");
const extractedText = document.getElementById("text");
const summary = document.getElementById("summary");

analyzeBtn.addEventListener("click", async () => {

    if (!selectedFile) {
        alert("Please upload an image first.");
        return;
    }

    loading.style.display = "block";
    result.style.display = "none";

    try {

        // Convert image to Base64
        const base64 = await toBase64(selectedFile);

        const response = await fetch("https://visionai-backend-cm2z.onrender.com/api/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                image: base64.split(",")[1],

                mimeType: selectedFile.type

            })

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        loading.style.display = "none";

        result.style.display = "block";

        result.classList.add("fade-in");

        title.textContent = data.title || "No Title";

        description.textContent =
            data.description || "No Description";

        extractedText.textContent =
            data.text_found || "No Text Found";

        summary.textContent =
            data.summary || "No Summary";

        objects.innerHTML = "";

        if (Array.isArray(data.objects)) {

            data.objects.forEach(item => {

                const li = document.createElement("li");

                li.textContent = item;

                objects.appendChild(li);

            });

        }

    } catch (err) {

        loading.style.display = "none";

        alert(err.message);

        console.error(err);

    }

});

// ======================================
// FILE TO BASE64
// ======================================

function toBase64(file){

    return new Promise((resolve,reject)=>{

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload=()=>resolve(reader.result);

        reader.onerror=error=>reject(error);

    });

}

// ======================================
// COPY RESULT
// ======================================

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", () => {

    const text = `

Title:
${title.textContent}

Description:
${description.textContent}

Objects:
${objects.innerText}

Extracted Text:
${extractedText.textContent}

Summary:
${summary.textContent}

`;

    navigator.clipboard.writeText(text);

    copyBtn.innerHTML =
    '<i class="fa-solid fa-check"></i> Copied';

    setTimeout(() => {

        copyBtn.innerHTML =
        '<i class="fa-solid fa-copy"></i> Copy';

    },2000);

});


// ======================================
// DOWNLOAD REPORT
// ======================================

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click",()=>{

const report = `

========= VisionAI Report =========

Title:
${title.textContent}

Description:
${description.textContent}

Objects:
${objects.innerText}

Extracted Text:
${extractedText.textContent}

Summary:
${summary.textContent}

Generated by VisionAI

`;

const blob = new Blob([report],{
type:"text/plain"
});

const url = URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="VisionAI_Report.txt";

a.click();

URL.revokeObjectURL(url);

});


// ======================================
// CHAT
// ======================================

const sendBtn=document.getElementById("sendBtn");

const chatInput=document.getElementById("chatInput");

const chatMessages=document.getElementById("chatMessages");

sendBtn.addEventListener("click",sendMessage);

chatInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});

function sendMessage(){

const message=chatInput.value.trim();

if(message==="") return;

const user=document.createElement("div");

user.className="message user";

user.textContent=message;

chatMessages.appendChild(user);

chatInput.value="";

setTimeout(()=>{

const ai=document.createElement("div");

ai.className="message ai";

ai.innerHTML=`

🤖 I'm currently using the previous image analysis.

You asked:

"${message}"

(Connect this to Gemini Chat in the next version.)

`;

chatMessages.appendChild(ai);

chatMessages.scrollTop=chatMessages.scrollHeight;

},800);

}


// ======================================
// HISTORY
// ======================================

function saveHistory(){

const history=JSON.parse(localStorage.getItem("visionHistory"))||[];

history.unshift({

date:new Date().toLocaleString(),

title:title.textContent,

summary:summary.textContent

});

localStorage.setItem(

"visionHistory",

JSON.stringify(history)

);

}


// ======================================
// SAVE AFTER ANALYSIS
// ======================================

const oldAnalyze = analyzeBtn.onclick;

analyzeBtn.addEventListener("click",()=>{

setTimeout(()=>{

if(summary.textContent!==""){

saveHistory();

}

},2500);

});


// ======================================
// SPEECH
// ======================================

function speak(text){

const speech=new SpeechSynthesisUtterance(text);

speech.rate=1;

speech.pitch=1;

speech.lang="en-US";

window.speechSynthesis.speak(speech);

}


// ======================================
// DOUBLE CLICK SUMMARY
// ======================================

summary.addEventListener("dblclick",()=>{

if(summary.textContent){

speak(summary.textContent);

}

});


// ======================================
// LOADING TEXT
// ======================================

const loadingText=document.getElementById("loadingText");

const messages=[

"Uploading image...",

"Reading pixels...",

"Detecting objects...",

"Reading text...",

"Generating summary...",

"Finalizing..."

];

let index=0;

setInterval(()=>{

if(loading.style.display==="block"){

loadingText.textContent=messages[index];

index++;

if(index>=messages.length){

index=0;

}

}

},1000);
