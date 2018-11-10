
  //links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
nlp = window.nlp_compromise;

var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'H-BOT', //name of the chatbot
  talking = true; //when false the speach function doesn't work

//
//

//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  botMessage = 'Dear, I request you to please coordinate with me through email or phone call to assist you better. Thank you.'; 

  if (true === /\bhi\b/i.test(lastUserMessage) || true === /hello/i.test(lastUserMessage) || true === /hey/i.test(lastUserMessage)) {
    const hi = ['Hi','Hello','Hey']
    botMessage =''+ hi[Math.floor(Math.random()*(hi.length))] + ' \n Dear, How can I help you?';
  }

  if (true === /your name/i.test(lastUserMessage) || true === /\bwho\b/i.test(lastUserMessage)) {
    botMessage = 'I am ' + botName +'- an auto-generated talkable chatbot. By the way, What is your good name?';
  }

  if (true === /\bname is\b/i.test(lastUserMessage)){botMessage = 'Dear '+ lastUserMessage.slice(10, 25) +', Welcome!';
  }

  if (true === /\bdate\b/i.test(lastUserMessage) || true === /\btime\b/i.test(lastUserMessage)) 
  {
    botMessage = 'Current date & time is '  + Date() +'.';
  }

  if(true === /\blooking for\b/i.test(lastUserMessage) || true === /\bi want\b/i.test(lastUserMessage)|| true === /\bservices\b/i.test(lastUserMessage))
  {
    botMessage = 'I am providing Web Designing, Web Development, and Content Writing services'+". ";
  }

  if(true === /\bBye\b/i.test(lastUserMessage) || true === /\bTalk to you later\b/i.test(lastUserMessage))
  {
    botMessage = 'Good Bye, Have a nice day!!';
  }

if(true === /\bthank you\b/i.test(lastUserMessage))
  {
    botMessage = 'Your most welcome!';
  }

}

//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    
    //Code for inserting user input....


    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push('<b>'+lastUserMessage+'</b>');
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages

    //Code for inserting reply from bot....
    messages.push('<div class="t-image"><img src="harsh.jpg" alt="User" class="clear"></div><b style="margin:5% 5% 5% 8%;">' + botMessage+'</b>');
    
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    utterance.rate = 1.5; // 0.1 to 10
    utterance.pitch = 1.5; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}
//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi')
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}
//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}