import { Notifications, NotificationType } from "@twilio/flex-ui";

const registerCallRedirectToVoicemailError = (manager) => {
  manager.strings.outboundMessageFailed =
    'Outbound Message failed: "{{message}}"';
  Notifications.registerNotification({
    id: "callRedirectToVoicemailError",
    content: "callRedirectToVoicemailError", // template
    closeButton: false,
    timeout: 6000,
    type: NotificationType.error,
  });
};

const registerCallRedirectToVoicemail = (manager) => {
  manager.strings.outboundMessageSent = 'Message sent to "{{message}}"';
  Notifications.registerNotification({
    id: "callRedirectToVoicemail",
    content: "callRedirectToVoicemail", // template
    timeout: 3000,
    type: NotificationType.info,
  });
};

const registerNotifications = (manager) => {
    registerCallRedirectToVoicemailError(manager);
  registerCallRedirectToVoicemail(manager);
};

export default registerNotifications;