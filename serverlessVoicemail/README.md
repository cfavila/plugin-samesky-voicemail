# Serverless Voicemail

This Twilio Serverless package provides endpoints for redirecting a connected call ( customer-to-agent ) to use a Twilio Function to update the call (redirect) and play (TwiML) a pre-recorded message ( .mp3 format ).


#### Pre-Requisites
Utilization of this package requires local installation of the Twilio CLI and CLI Serverless Toolkit.

1. [Twilio CLI](https://www.twilio.com/docs/twilio-cli/getting-started/install) - https://www.twilio.com/docs/twilio-cli/getting-started/install
2. [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit) - https://www.twilio.com/docs/labs/serverless-toolkit
3. Create a CLI profile for your account ( https://www.twilio.com/docs/twilio-cli/general-usage/profiles) 
4. Set your CLI profile as the active account ( https://www.twilio.com/docs/twilio-cli/general-usage/profiles#set-an-active-profile )

### Create Enviroment File
Execute the following command in a Terminal window.
```sh
cp .env.example .env
```

#### Configure Environment Variables
The following variables are required:

1. ACCOUNT_SID
2. AUTH_TOKEN

#### Build package dependencies
Use the following command to build dependencies for the serverless package.
```sh
npm i
```

#### Run the package locally on port 3000
Use the following command to run the serverless package locally (localhost) for testing and development
```sh
twilio serverless:start
```

#### Deploy the Serverless Package
Use the Twilio CLI serverless toolkit to deploy the package to your active (profile) Twilio account.

```sh
twilio serverless:deploy
```