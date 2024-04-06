import React, {useState} from 'react'
import { withTaskContext } from '@twilio/flex-ui'

import { Select, Button, FormControl, InputLabel, MenuItem } from '@mui/material'

import { sendToVoicemail } from '../../helpers/sendToVoicemail'

const styles = {
  wrapper: {margin: 20},
}

//  static array of prompts - in PROD this may be an AJAX (useEffect) query to retrieve the proper list
const prompts = [
  {description: 'Sample Voicemail Recording', url: `${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/SampleRecording.mp3`},
  {description: 'Spanish Rains', url: `${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/SpanishRain.mp3`},
  {description: 'Jumping Foxes', url: `${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/QuickBrownFow.mp3`},
]

const VoicemailButtonOption = (props) => {

  const [promptUrl, setPromptUrl] = useState('')

  const task = props.task.attributes

  const handleChange = (e) => {

    setPromptUrl(e.target.value)

  }
  const handleClick = () => {
    if (promptUrl=='') { alert('Select a prompt'); return }

    let customerCallSid = task.conference.participants.customer
    sendToVoicemail({
      mode: "redirect", 
      serverlessDomain: process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN,
      customerCallSid: customerCallSid,
      promptUrl: promptUrl
    })    

  }
  return (
    <div style={styles.wrapper}>
      <FormControl fullWidth size="small">
        <InputLabel id="vm-prompt-label" >Voicemail Prompt</InputLabel>
        <Select
          labelId="vm-prompt-select"
          id="demo-simple-select"
          value={promptUrl}
          label="Age"
          onChange={(e) => handleChange(e)}
          // notched={false}
        >
          {
            prompts.map((item, index) => <MenuItem key={index} value={item.url}>{item.description}</MenuItem>)
          }

        </Select>
    </FormControl>
    <Button variant='outlined' fullWidth size={'small'} sx={{marginTop: '10px'}} onClick={() => handleClick()}>Play Voicemail Prompt</Button>

    </div>
  )
}

export default withTaskContext(VoicemailButtonOption)