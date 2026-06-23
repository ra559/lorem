const words = `
lorem ipsum dolor sit amet consectetur adipiscing elit
sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua ut enim ad minim veniam quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla
pariatur excepteur sint occaecat cupidatat non proident
sunt in culpa qui officia deserunt mollit anim id est laborum
`.trim().split(/\s+/);


const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("generateType");

const themeBtn = document.getElementById("themeBtn");

let currentFormat = "text";

document.querySelectorAll(".format-btn")
.forEach(button => {

button.addEventListener("click",()=>{

document.querySelectorAll(".format-btn")
.forEach(btn=>{
btn.classList.remove("is-link","is-light","active");
});

button.classList.add(
"is-link",
"is-light",
"active"
);

currentFormat=button.dataset.format;

});

});


function randomWord(){

return words[
Math.floor(Math.random()*words.length)
];

}


function generateWords(count){

let result=[];

for(let i=0;i<count;i++){

result.push(randomWord());

}

return result.join(" ");

}


function capitalize(text){

return text.charAt(0).toUpperCase()+
text.slice(1);

}


function generateSentence(){

let length=Math.floor(
Math.random()*12
)+8;

let sentence=
capitalize(generateWords(length));

return sentence + ".";

}


function generateParagraph(){

let sentenceCount=
Math.floor(Math.random()*5)+4;

let paragraph=[];

for(let i=0;i<sentenceCount;i++){

paragraph.push(
generateSentence()
);

}

return paragraph.join(" ");

}


function formatOutput(data){

if(currentFormat==="text"){

return data.join("\n\n");

}

if(currentFormat==="markdown"){

return data
.map(item=>`> ${item}`)
.join("\n\n");

}

if(currentFormat==="html"){

return data
.map(item=>`<p>${item}</p>`)
.join("\n");

}

}


function generateContent(){

const amount=
parseInt(amountInput.value);

const type=
typeSelect.value;

let result=[];


if(type==="words"){

result.push(
generateWords(amount)
);

}

if(type==="sentences"){

for(let i=0;i<amount;i++){

result.push(
generateSentence()
);

}

}

if(type==="paragraphs"){

for(let i=0;i<amount;i++){

result.push(
generateParagraph()
);

}

}

output.value=
formatOutput(result);

}


generateBtn.addEventListener(
"click",
generateContent
);


copyBtn.addEventListener(
"click",
async ()=>{

output.select();

navigator.clipboard.writeText(
output.value
);

copyBtn.textContent="Copied";

setTimeout(()=>{

copyBtn.textContent="Copy";

},1500);

}
);


function applyTheme(theme){

document.documentElement
.setAttribute(
"data-theme",
theme
);

localStorage.setItem(
"theme",
theme
);

themeBtn.textContent=
theme==="dark"
? "☀ Theme"
: "🌙 Theme";

}


themeBtn.addEventListener(
"click",
()=>{

const current=
document.documentElement
.getAttribute("data-theme");

applyTheme(
current==="dark"
? "light"
: "dark"
);

}
);


const savedTheme=
localStorage.getItem(
"theme"
)||"light";

applyTheme(savedTheme);

generateContent();