'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'WelcomeIntent'.
app.intent('WelcomeIntent', (conv, {firstName}) => {
    //conv.close('Your name is ' + firstName);
    conv.ask('Hello, Welcome To Diabetes Assistant. What is your name?');
});

// Handle the Dialogflow intent named 'NameIntent'.
// The intent collects a parameter named 'firstName'.
app.intent('NameIntent', (conv, {firstName}) => {
    // Respond with the user's name and end the conversation.
    //conv.close('Your name is ' + firstName);
    conv.ask('Hello, ' + firstName + '. How old are you?');
});

// Handle the Dialogflow intent named 'AgeIntent'.
// The intent collects a parameter named 'age'.
app.intent('AgeIntent', (conv, {age}) => {
    //conv.close('Now I know you are ' + age + ' years old');
    conv.ask('What is your blood glucose level?');
});

// Handle the Dialogflow intent named 'GetGlucoseLevel'.
// The intent collects a parameter named 'number'.
app.intent('GetGlucoseLevel', (conv, {number}) => {
    if(number >= 200){
        conv.ask('Oops, glucose level of ' + number + ' is not very good. Should I show you nearby hospitals?');
    }else{
        conv.ask('Awesome, glucose level of ' + number + ' is not bad.');
    }
});

// Handle the Dialogflow intent named 'ShowTip'.
app.intent('ShowTip', (conv, {}) => {
    conv.ask('Diabetes is a disease in which your blood glucose, or blood sugar, levels are too high. Glucose comes from the foods you eat. Insulin is a hormone that helps the glucose get into your cells to give them energy. With type 1 diabetes, your body does not make insulin.');
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);