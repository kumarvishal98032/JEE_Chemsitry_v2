let current=0;let answers=new Array(questions.length).fill(null);
function loadQ(){document.getElementById('qno').innerHTML='Question '+(current+1);document.getElementById('question').innerHTML=questions[current].question;let h='';questions[current].options.forEach((o,i)=>{h+=`<div><input type='radio' name='o' ${answers[current]==i?'checked':''} onclick='answers[current]=${i}; palette();'> ${o}</div>`});document.getElementById('options').innerHTML=h;}
function palette(){

    let p='';

    for(let i=0;i<questions.length;i++){

        let color = "#cccccc"; // Not Visited

        if(answers[i] !== null){
            color = "#28a745"; // Green = Answered
        }

        p += `
        <button
            class='palette-btn'
            style='background:${color};color:white;font-weight:bold;'
            onclick='gotoQ(${i})'>
            ${i+1}
        </button>`;
    }

    document.getElementById('palette').innerHTML = p;
}
function gotoQ(i){current=i;loadQ();}
function nextQ(){if(current<questions.length-1){current++;loadQ();}}
function prevQ(){if(current>0){current--;loadQ();}}
function submitTest(){

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    for(let i = 0; i < questions.length; i++){

        if(answers[i] === null){
            unattempted++;
        }

        else if(answers[i] === questions[i].answer){
            correct++;
            score += 4;
        }

        else{
            wrong++;
            score -= 1;
        }
    }

    let accuracy = 0;

    if((correct + wrong) > 0){
        accuracy = ((correct / (correct + wrong)) * 100).toFixed(2);
    }
    let name =
document.getElementById("studentName").value;

fetch(
"https://script.google.com/macros/s/AKfycbyzVO9YPLSgfQU5Lmv6ux_lXwbz0figyTdXBtSa4QoexKT2a012ik2gYnn__nPK_uTdqA/exec",
{
    method:"POST",
    mode: "no-cors",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name:name,
        score:score,
        correct:correct,
        wrong:wrong,
        unattempted:unattempted
    })
}
)
.then(response => response.text())
.then(data => console.log("Saved:", data))
.catch(error => console.error("Error:", error));
    
    document.body.innerHTML = `
    <div style="font-family:Arial;padding:30px;max-width:800px;margin:auto;">
        <h1>JEE Chemistry Mock Test Result</h1>

        <hr>

        <h2>Summary</h2>

        <p><b>Total Questions:</b> ${questions.length}</p>

        <p><b>Correct Answers:</b> ${correct}</p>

        <p><b>Wrong Answers:</b> ${wrong}</p>

        <p><b>Unattempted:</b> ${unattempted}</p>

        <p><b>Accuracy:</b> ${accuracy}%</p>

        <hr>

        <h2>Final Score</h2>

        <p>
        (${correct} × 4) − (${wrong} × 1)
        </p>

        <h1>${score} Marks</h1>

        <hr>

        <h2>Performance</h2>
        
        ${
            score >= 90 ? "<h3>Outstanding ⭐</h3>" :
            score >= 75 ? "<h3>Excellent ✅</h3>" :
            score >= 60 ? "<h3>Good 👍</h3>" :
            score >= 40 ? "<h3>Average 📘</h3>" :
            "<h3>Needs Improvement 📚</h3>"
        }
    </div>
    `;
}
let t=1800;setInterval(()=>{let m=Math.floor(t/60),s=t%60;let el=document.getElementById('timer');if(el){el.innerHTML=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}t--;if(t<0)submitTest();},1000);
palette();loadQ();
