const TokenValidator = require('twilio-flex-token-validator').functionValidator;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

//exports.handler = TokenValidator(function(context, event, callback) {
  exports.handler = async function(context, event, callback) {

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  // response.setBody({event: event, context:context })
  // callback(null, response)
  const client = context.getTwilioClient();
  let result = {}

  let mode = event.mode
  let domain = event.serverlessDomain
  let customerCallSid = event.customerCallSid
  let promptUrl = encodeURIComponent(event.promptUrl)


  const redirect = async (customerCallSid, promptUrl) => {
    //const url = `voicemailRedirect?mode=process&promptUrl=${promptUrl}`
    const url = `${domain}/voicemailRedirect?mode=process&promptUrl=${promptUrl}`
    console.log('url', url)
    await client.calls(customerCallSid)
      .update({method: 'POST', url: url})
      .then(call => {
        // console.log('in redirect', call)

        response.appendHeader("Content-Type", "application/json");
        result = {status: 'success'}
        response.setBody(result)
        callback(null, response);
      });
  }

  const process = (promptUrl) => {
    console.log('in process', decodeURIComponent(promptUrl))
    const twiml = new VoiceResponse();

    console.log('----')
    // play a simple message
    //twiml.say('This is the message. Have a good evening')
    twiml.play(decodeURIComponent(promptUrl))

    response.setBody(twiml.toString())

    callback(null, response)
  }

  if(mode == "redirect") { redirect(customerCallSid, promptUrl)}
  if(mode=="process"){ process(promptUrl) }
};
