
let quiz = [
  {
    "question": 'Who is Ned Stark\'s bastard son?',
    "choices": ['John Rivers',
                'Ramsey Snow',
                'Jon Snow',
                'Alistair Cooke'],
    "correct": 'Jon Snow',
    "explanation": 'Jon Snow is Ned Stark\'s bastard son who later becomes the king of the north',
    },
  {
    "question": 'Who is Queen Cersei\'s brother?',
    "choices": ['Alfred Hitchcock',
                'Jaime Lannister',
                'George RR Martin',
                'Joffrey Baratheon'],
    "correct": 'Jaime Lannister',
    "explanation" : 'Jaime Lannister is Queen Cersei\'s brother and lover',
    },
  {
    "question": 'Who lives beyond the great wall?',
    "choices": ['The Chinese', 
                'The Wildlings',
                'The Mongols',
                'The White Walkers'],
    "correct": 'The Wildlings',
    "explanation": "The Wildlings are the indigenous people forced to live beyond the great wall. The White Walkers are dead so can't be considered living beyond the wall",
    },
  {
    "question": 'What does it mean to take the black?',
    "choices": ['The opposite of taking the white',
                'Joining the night\'s watch',
                'Drinking dark ale',
                'Joining the peace corp'],
    "correct": 'Joining the night\'s watch',
    "explanation": "Taking the black means that someone, usually a criminal or dishonored noble, joins the night's watch to guard the great wall",
    },
  {
    "question": 'Daenerys is the last in the line of which royal family?',
    "choices": ['The Baratheons',
                'The Starks',
                'The Targaryens',
                'The Tyrells'],
    "correct": 'The Targaryens',
    "explanation": "Daenerys is the daughter of Aerys II Targaryen, the legitimate heir to the Iron Throne",
    },
{
    "question": 'What is Jon Snow\'s famous warning?',
    "choices": ['The red coats are coming!',
                'Winter is coming!',
                'The world is coming to an end!',
                ' Beware the Ides of March!'],
    "correct": 'Winter is coming!',
    "explanation": 'Winter is coming! is Jon Snow\'s warning of the relentless march of the Night King and the army of White Walkers',
    },
  {
    "question": 'Arya Stark mastered the ability to become a _____',
    "choices": ['Direwolf',
                'Faceless Man',
                'wife',
                'Septa'],
    "correct": 'Faceless Man',
    "explanation" : 'Arya Stark has mastered art of the Faceless Man which is the ability to assume different identities by using the faces of people she has killed',
    },
  {
    "question": 'Sansa Stark is the Lady of _________',
    "choices": ['the Night',
                'Shanghai',
                'Winterfell',
                'Casterly Rock'],
    "correct": 'Winterfell',
    "explanation": "Through many trials and tribulation Sansa Stark returns to her ancestral castle to become the Lady of Winterfell",
    },
  {
    "question": 'Who is now the Three Eyed Raven?',
    "choices": ['The Two Eyed Raven',
                'Mira Reed',
                'Bran Stark',
                'Bilbo Baggin'],
    "correct": 'Bran Stark',
    "explanation": "Bran Stark becomes the mystical figure the Three Eyed Raven, a power figure who can see and experience all events in the past and present",
    },
  {
    "question": 'Who is known as the Imp?',
    "choices": ['Hodor',
                'Tyrion Lannister',
                'Drogon',
                'The Night King'],
    "correct": 'Tyrion Lannister',
    "explanation": "Tyrion Lannister, the minutive brother of Cersei and Jaime Lannister, plays a pivotal role in the Game of Thrones in that he is the advisor to Daenerys Targaryen",
    }    
    ];


let currentquestion = 0,
     score = 0,
     submt = true,
     picked;

// jQuery command to test to see if DOM is ready
$(document).ready(function(){
  // unimplemented submit button
  // $("#submitbutton").hide();
       
// sets up response for quiz       
function htmlEncode(value) {
  return $(document.createElement('div')).text(value).html();
  }

// counter for user response
function addChoices(choices) {
  if (typeof choices !== "undefined" && $.type(choices) == "array") {
    $('#choice-block').empty();
    for (let i = 0; i < choices.length; i++) {
      $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
      }
    }
  }

// evaluates response, adds counter for advancing to next question
function nextQuestion() {
  submt = true;
    $('#explanation').empty();
    $('#question').text(quiz[currentquestion]['question']);
    $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
      if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
      if ($('#question-image').length == 0) {
        $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
      } else {
        $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
        }
        } else {
          $('#question-image').remove();
            }
          addChoices(quiz[currentquestion]['choices']);
          setupButtons();
        }

// evaluates which question the user is on
function processQuestion() {
  currentquestion++;
    $("#submitbutton").hide();
      if (currentquestion == quiz.length) {
      endQuiz();
        } else {
          nextQuestion();
        }
      }

// set up button states
function setupButtons() {
  $('.choice').on('mouseover', function () {
    $(this).css({
      'background-color': '#f1db73'
        });
      });
    $('.choice').on('mouseout', function () {
      $(this).css({
      'background-color': '#fff'
         });
       })
    $('.choice').on('click', function () {
      choice = $(this).attr('data-index');
      $('.choice').removeAttr('style').off('mouseout mouseover');
      $(this).css({
        'border-color': '#222',
        'font-weight': 500,
        'background-color': '#f4e497'
        });
        if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
          $('.choice').eq(choice).css({
            'background-color': '#b3d7af'
        });
    $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
             score++;
      } else {
        $('.choice').eq(choice).css({
          'background-color': '#d63432'
        });
        $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
        }

        if (submt) {
          submt = false;

        setTimeout(processQuestion,5000); // time delay for next answer

        }
      })
    }

// function to calculate final score
function endQuiz() {
  $('#explanation').empty();
  $('#question').empty();
  $('#choice-block').empty();
  $('#submitbutton').remove();
  $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
  $(document.createElement('h2')).css({
    'text-align': 'center',
    'font-size': '4em'
    }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');

  let result = Math.round(score / quiz.length * 100);
  let graphic = document.createElement('img');
    graphic.id = 'imgId';
    $(graphic).css({
      'height':'100%',
      'width': '100%',
      'margin':'auto'
      }).insertAfter('#explanation');

  if(result < 33){
    $("#imgId").attr("src","./assets/fire_breathing_dragon05.gif");
    }
    else if(result < 50){
      $("#imgId").attr("src","./assets/fire_breathing_dragon05.gif");
      }
    else if(result < 100){
      $("#imgId").attr("src","./assets/dancing-tyrion.gif");
      }
    else if(result == 100){
      $("#imgId").attr("src","./assets/dancing-tyrion.gif");
      }
    }

// initialize quiz
function init() {
  if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
    $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
      }

//add pager and questions
  if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
//add pager
    $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
//add first question
    $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
//add image if present
    if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] !== "") {
      $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
    }
//questions holder
    $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
//add choices
    addChoices(quiz[0]['choices']);
    $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

    setupButtons();

      }
    }

     init();
 });    