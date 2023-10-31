/* response_handler.js 用于处理LEX机器人的响应 */

/* 将Lex响应转换为Facebook Messenger格式 */
function convertToFacebookFormat(contentType, content) {
  if (contentType === "CustomPayload") {
    return {
      attachment: {
        type: "template",
        payload: JSON.parse(content)
      }
    };
  } else if (contentType === "PlainText") {
    return {
      text: content
    };
  }
}

/* 基于用户的初始话语创建响应 */
function formElicitSlotWithTemplateResponse(
  intentName,
  slots,
  slotToElicit,
  template,
  sessionAttributes
) {
  const facebookMessage = convertToFacebookFormat("CustomPayload", JSON.stringify(template));
  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "ElicitSlot",
        slotToElicit,
      },
      intent: {
        name: intentName,
        slots,
      }
    },
    messages: [facebookMessage]
  };
}

/* 基于用户的终止话语创建响应 */
function formTerminalResponse(sessionAttributes, fulfillmentState, intent, messageText) {
  const facebookMessage = convertToFacebookFormat("PlainText", messageText);
  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "Close",
      },
      intent: {
        confirmationState: "Confirmed",
        name: intent,
        state: fulfillmentState
      },
    },
    messages: [facebookMessage]
  };
}

/* 清除最近的意图历史，让用户在聊天中重新开始 */
function formElicitIntentResponse(sessionAttributes, intentName, messageText) {
  const facebookMessage = convertToFacebookFormat("PlainText", messageText);
  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "ElicitIntent",
      },
    },
    messages: [facebookMessage]
  };
}

module.exports = {
  formElicitSlotWithTemplateResponse,
  formTerminalResponse,
  formElicitIntentResponse,
};
