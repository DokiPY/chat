const {
  FULFILLMENT_STATES,
  TEST_INTERACTIVE_OPTIONS,
} = require("./constants/interactive_options");
const { formTerminalResponse } = require("./util/response_handler");
const {
  handleElicitAction,
  handleActionResponse,
  handleInteractiveOptionResponse,
  handleOtherResponse,
} = require("./util/user_input_handler");

/* MAIN HANDLER */
exports.handler = async (event, context) => {
  try {
    console.log(`Request received: ${JSON.stringify(event)}`);
    let response = handleRequest(event);
    console.log(`Returning response: ${JSON.stringify(response)}`);
    return formatResponseForFacebookMessenger(response);
  } catch (err) {
    console.error(`Error processing Lex request:`, err);
    return formatResponseForFacebookMessenger(
      formTerminalResponse(
        {},
        FULFILLMENT_STATES.FAILED,
        "Error in Lex Lambda"
      )
    );
  }
};

/* PROCESS INBOUND MESSAGE */
function handleRequest(request) {
  let input = request.inputTranscript;
  let recent_intent = request.sessionState.intent;
  request.currentIntent = request.interpretations[0].intent;
  let current_intent = request.currentIntent.name;
  let initialPrompt = request.inputTranscript;

  /* HANDLE INTENT 'InteractiveMessageIntent' */
  if (current_intent === 'InteractiveMessageIntent' && (recent_intent === null || initialPrompt === 'help')) {
    return handleElicitAction(request);
  } else if (current_intent === 'InteractiveMessageIntent' && !(Object.values(TEST_INTERACTIVE_OPTIONS).includes(input)) && recent_intent.slots.interactiveOption === null) {
    return handleActionResponse(input, request);
  } else if (current_intent === 'InteractiveMessageIntent' && Object.values(TEST_INTERACTIVE_OPTIONS).includes(input) && recent_intent.slots.interactiveOption !== null) {
    return handleInteractiveOptionResponse(input, request);
  } 
  /* (optional) HANDLE OTHER INTENTS */

  /* HANDLE FULFILLED INTENT */
  else {
    return handleOtherResponse(input, request);
  }
}

/* FORMAT RESPONSE FOR FACEBOOK MESSENGER */
function formatResponseForFacebookMessenger(lexResponse) {
  // Assuming the Lex response is in a format that Facebook Messenger expects
  // You might need to adjust this function based on the actual format of your Lex response and Facebook Messenger's requirements
  return lexResponse;
}
