/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing cooking tips
 */
var TIPS = [
    "If your food is missing something, try adding salt or acid. Most of the time you can try adding a splash of lemon juice, hot sauce, or vinegar.",
    "Adding a small amount of salt on sweet things allows the sweet flavor to stand out more. It cuts out some of the bitterness.",
    "Lentils are cheap and high in protein. Add a little fat to make a nutritious frugal meal.",
    "Keep your kitchen clean by cleaning as you go.",
    "Try to get your ingredients fresh.",
    "Pressing a burger on the grill makes it less juicy.",
    "Store spices and herbs in a cool, dark place to prevent loss of flavor.",
    "Don't overcrowd your pan when sauteing or your food will steam.",
    "The best way to learn is to try it yourself.",
    "Do multiple taste tests as you cook.",
    "Remember to sharpen your knives regularly. Dull knives are more dangerous.",
    "A falling knife has no handle.",
    "Chop using the rear of your blade in a rolling motion.",
    "Food continues to cook even off the heat.",
    "Not everything should be cooked in high heat. Not everything should be cooked in low heat. Learn to moderate the heat.",
    "Remember to wash your hands. Especially if you touch meat.",
    "Plating can make all the difference.",
    "Prep as much as possible before you cook.",
    "Pay attention to your cooking. It could be the difference between a delicious meal, a burnt dish, or the loss of a finger.",
    "Try to get unsalted products like butter so you can season to your liking.",
    "Anyone can cook. Just have confidence.",
    "If your cookies look completely done when taking them out, they're already burnt.",
    "Using a damp paper towel, wrap your stale or dry bread, brownies, or biscuits and stick them in the microwave for a few seconds. They'll be good as new.",
    "Don't knock it til you try it.",
    "Salt your water when boiling pasta, vegetables, etc.",
    "Baking soda or salt can smother a grease or oil fire. Baking powder is not an alternative to baking soda in this case.",
    "Bring your meat to room temperature before you cook it.",
    "Don't touch anything after handling raw meat. It spreads the bacteria.",
    "Don't use metal on nonstick.",
    "Never pour oil down the train",
    "Don't touch your face after handling spicy foods",
    "Milk and milk produts can decrease the spiciness and saltiness.",
    "Lay a damp towel under your cutting board to keep the board from slipping",
    "Salt immediately after frying. It sticks better",
    "Try a recipe before you tweak it."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * CookingTips is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var CookingTips = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
CookingTips.prototype = Object.create(AlexaSkill.prototype);
CookingTips.prototype.constructor = CookingTips;

CookingTips.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

CookingTips.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewTipRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
CookingTips.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

CookingTips.prototype.intentHandlers = {
    "GetNewTipIntent": function (intent, session, response) {
        handleNewTipRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a cooking tip, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new Tip from the list and returns to the user.
 */
function handleNewTipRequest(response) {
    // Get a random space Tip from the space Tips list
    var TipIndex = Math.floor(Math.random() * TIPS.length);
    var randomTip = TIPS[TipIndex];

    // Create speech output
    var speechOutput = randomTip;
    var cardTitle = "Your Tip";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var cookingTips = new CookingTips();
    cookingTips.execute(event, context);
};
