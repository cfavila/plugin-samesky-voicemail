
import { Actions, Manager, Notifications } from '@twilio/flex-ui'
const manager = Manager.getInstance()


export const sendToVoicemail = async (params) => {

    const body = {
        ...params,
        Token: manager.store.getState().flex.session.ssoTokenPayload.token,
    }

    console.log("DEBUG BODY", body)

    const options = {
        method: "POST",
        body: new URLSearchParams(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      };
      
      try {
        const resp = await fetch(
          `${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/voicemailRedirect`,
          options
        );
        const data = await resp.json();
        // notification message for simple notifications
        if (data.status=='success') {
          Notifications.showNotification("callRedirectToVoicemail", {
            message: body.To,
          });
        } else {
          Notifications.showNotification("callRedirectToVoicemailError", {
            message: data.errorMessage,
          });
        }
        return data
        
      } catch (error) {
        console.error(error);
        Notifications.showNotification("outboundMessageFailed", {
          message: "Error calling sendOutboundMessage function",
        });
      }

}