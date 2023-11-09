
// Import the variable
const testquest=[]
let quest=1;
const scienceapi='https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple';
const filmapi='https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple';
const animalapi='https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple';
const animeapi='https://opentdb.com/api.php?amount=5&category=31&difficulty=easy&type=multiple';
const geoapi='https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple';
const bookapi='https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple';
var check=true;
var loginbutton=document.getElementById("loginbutton");
loginbutton.addEventListener("click",()=>{
    window.location.href="login.html";
})
    fetchTriviaQuestion();

  
function checki(page)
{
    if(page=='quiz.html')return scienceapi;
    if(page=='animals.html')return animalapi;
    if(page=='anime.html')return animeapi;
    if(page=='geo.html')return geoapi;
    if(page=='film.html')return filmapi;
    if(page=='book.html')return bookapi;
    else return "";
}
function fetchTriviaQuestion() {

   
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log( page );
    var api=checki(page);
    var setofquestion=[];
    setofquestion=testquest;
    const apiUrl = api;

  
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the data here
        console.log(data.results);
        que=data.results;
        que.forEach(a=>{
            var q="";
    var opt1="";
    var opt2="";
    var opt3="";
    var opt4="";
    var opt1true="false";
    var opt2true="false";
    var opt3true="false";
    var opt4true="false";
            q=a.question;
            if(check)
            {
                opt1=a.correct_answer;
                opt1true=true;
                opt2=a.incorrect_answers[0];
                opt3=a.incorrect_answers[1];
                opt4=a.incorrect_answers[2];
                check=false;


            }
            else{
                opt2=a.correct_answer;
                opt2true=true;
                opt1=a.incorrect_answers[0];
                opt3=a.incorrect_answers[1];
                opt4=a.incorrect_answers[2];
                check=true;


            }
           
            let obj={
                question:q,
                answers:[
                    {text:opt1,correct:opt1true},
                    {text:opt2,correct:opt2true},
                    {text:opt3,correct:opt3true},
                    {text:opt4,correct:opt4true},

                ]
            }
            testquest.push(obj);
            


        })
        console.log(testquest);




const questionelement=document.getElementById('question');
const answerButton=document.getElementById('answer-buttons');
const nextButton=document.getElementById('next-btn');
const counter=document.getElementById('counter');
const tim= document.getElementById("timercount");
const progress=document.getElementById("progress");

let timeLeft=20;
let timer;
let prog=0;

let currentquestionindex=0;
let score=0;

function updateTimerDisplay() {
    
   tim.textContent = timeLeft + "s";
  }
  function startTimer() {
    timer = setInterval(function() {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        
        clearInterval(timer);
        tim.textContent="over";
        timeLeft=20;
        prog+=20;

        handleNextButton();

       
      }
    }, 1000); // Update every second
  }
  function stopTimer() {
    clearInterval(timer);
    timeLeft = 20; // Reset the timer for the next question
   tim.textContent=timeLeft+"s";
  }

function startquiz()
{
    currentquestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    progress.style.width='0%';
    showQuestion();
}
function showQuestion()
{
    resetstate();
    startTimer(); 
    
    let currentquestion=setofquestion[currentquestionindex];
    let questionno=currentquestionindex+1;

    questionelement.innerHTML=questionno+". "+currentquestion.question;
    counter.innerHTML=questionno+"/"+5+ " Question";
    progress.style.width=`${prog}`+'%';

    currentquestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)

    });
   
   

}
function resetstate()
{
    nextButton.style.display='none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e) {
   
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    
    stopTimer();
    nextButton.style.display = "block";
    
}

function showScore()
{
    resetstate();
    questionelement.innerHTML=`You Scored ${score} out of ${testquest.length}`;
    nextButton.innerHTML="play again";
    const nextbutton=document.createElement("button");
    const gohome=document.createElement("button");
    gohome.innerHTML="Go Home";
    gohome.classList.add("btn");
    answerButton.appendChild(gohome);
    nextbutton.innerHTML="Next quiz";
    nextbutton.classList.add("btn");
    gohome.addEventListener("click",()=>{
        window.location.href="index.html";
    })
    nextbutton.addEventListener("click",()=>{
        window.location.href="film.html";
    })
    answerButton.appendChild(nextbutton);
}
function handleNextButton(){
   
    currentquestionindex++;
    if(currentquestionindex<testquest.length)
    {
        showQuestion();

    }
    else{
        
        progress.style.width=`${prog}`+'%';
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if(currentquestionindex<testquest.length)
    {
        prog+=20;
        handleNextButton();
    }
    else{
        startquiz();
    }
})

// function selectquestionset(page)
// {
//     if(page=="science-quiz.html")return questions;
//     if(page=="quiz.html")return questions1;
// }
updateTimerDisplay();

startquiz();


       
        
       
       
        
     

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

