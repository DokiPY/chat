/*AMAZON CONNECT TEMPLATE TYPES FOR INTERACTIVE MESSAGING*/
const TEMPLATE_TYPES = {
  LISTPICKER: "ListPicker",
  TIMEPICKER: "TimePicker"
};

/*IMAGES USED FOR INTERACTIVE MESSAGES*/

const IMAGE_URLS = {
  LAPTOP:
    "https://amazonconnectchatworkshopwebsitehelper2022-eu-central-1.s3.eu-central-1.amazonaws.com/interactive-images/laptop.jpg",
  TABLET:
    "https://amazonconnectchatworkshopwebsitehelper2022-eu-central-1.s3.eu-central-1.amazonaws.com/interactive-images/tablet.jpg",
  PHONE:
    "https://amazonconnectchatworkshopwebsitehelper2022-eu-central-1.s3.eu-central-1.amazonaws.com/interactive-images/phone.jpg",
  COMPANY:
    "https://amazonconnectchatworkshopwebsitehelper2022-eu-central-1.s3.eu-central-1.amazonaws.com/interactive-images/company.jpg",
};

/*FULFILLMENT STATES FOR AMAZON LEX BOT INTENTS*/
const FULFILLMENT_STATES = {
  FULFILLED: "Fulfilled",
  FAILED: "FAILED",
};

/*SLOTS SUPPORTED IN AMAZON LEX CHAT BOT*/
const SLOTS = {
  ACTION: "action",
  INTERACTIVE_OPTION: "interactiveOption",
  DEVICE: "device",
  APPOINTMENT: "appointment"
};


/*VALUES SUPPORTED IN THE DEPARTMENT SLOT*/
const DEVICE_SLOT = {
  LAPTOP: "Laptop",
  TABLET: "Tablet",
  PHONE: "Phone",
};

/*ACTIONS THAT A USER CAN TAKE */
const ACTIONS = {
  TEST_INTERACTIVE: "Computer support",
  PASSWORD_RESET: "Password reset",
  GENERAL_ENQUIRIES: "General enquiries",
  END_CHAT: "End chat",
};

const HELP = {HELP:"help"};

/*SELF-SERVICE OPTIONS WHEN USER SELECTS "CHECK SELF-SERVICE OPTIONS" AS AN ACTION*/
const TEST_INTERACTIVE_OPTIONS = {
  DEVICE_WITH_MULTIPLE_IMAGES: "Choose your device type",
  SIMPLE_TIMEPICKER: "Schedule a meeting with an agent"
};


/*MAPPING SELF-SERVICE OPTIONS TO AMAZON LEX BOT SLOTS*/
const TEST_INTERACTIVE_OPTIONS_SLOTS = {
  DEVICE_WITH_MULTIPLE_IMAGES: SLOTS.DEVICE,
  SIMPLE_TIMEPICKER: SLOTS.APPOINTMENT,
  INVALID: SLOTS.DEVICE,
  DEVICE_LISTPICKER: SLOTS.DEVICE
};

/*MAPPING SELF-SERVICE OPTIONS TO INTERACTIVE MESSAGE TEMPLATES*/
const TEST_INTERACTIVE_OPTIONS_TEMPLATES = {
  INVALID: {},
  DEVICE_LISTPICKER: {
    templateType: TEMPLATE_TYPES.LISTPICKER,
    version: "1.0",
    data: {
      content: {
        title: "Which device type are you using?",
        subtitle: "Tap to select option",
        elements: [
          {
            title: DEVICE_SLOT.LAPTOP,
            subtitle: "For Laptop",
          },
          {
            title: DEVICE_SLOT.TABLET,
            subtitle: "For Tablet",
          },
          {
            title: DEVICE_SLOT.PHONE,
            subtitle: "For Phone",
          },
        ],
      },
    },
  },
  SIMPLE_TIMEPICKER: {
    templateType: TEMPLATE_TYPES.TIMEPICKER,
    version: "1.0",
    data: {
      content: {
        title: "Schedule appointment",
        subtitle: "Tap to select option",
        timeslots: [
          {
            date: "2022-10-31T18:00+00:00",
            duration: 60,
          },
          {
            date: "2022-10-15T13:00+00:00",
            duration: 60,
          },
          {
            date: "2022-10-15T16:00+00:00",
            duration: 60,
          },
        ],
      },
    },
  },
  DEVICE_WITH_MULTIPLE_IMAGES: {
    templateType: TEMPLATE_TYPES.LISTPICKER,
    version: "1.0",
    data: {
      content: {
        title: "Which device type are you using?",
        subtitle: "Tap to select option",
        imageType: "URL",
        imageData: IMAGE_URLS.COMPANY,
        elements: [
          {
            title: DEVICE_SLOT.LAPTOP,
            subtitle: "For laptop",
            imageType: "URL",
            imageData: IMAGE_URLS.LAPTOP,
          },
          {
            title: DEVICE_SLOT.TABLET,
            subtitle: "For tablet",
            imageType: "URL",
            imageData: IMAGE_URLS.TABLET,
          },
          {
            title: DEVICE_SLOT.PHONE,
            subtitle: "For Phone",
            imageType: "URL",
            imageData: IMAGE_URLS.PHONE,
          },
        ],
      },
    },
  },
};

module.exports = {
  FULFILLMENT_STATES,
  SLOTS,
  TEMPLATE_TYPES,
  ACTIONS,
  HELP,
  TEST_INTERACTIVE_OPTIONS,
  TEST_INTERACTIVE_OPTIONS_SLOTS,
  TEST_INTERACTIVE_OPTIONS_TEMPLATES,
};