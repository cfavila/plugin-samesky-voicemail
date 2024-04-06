import React from 'react'

import { withTaskContext } from '@twilio/flex-ui'

import { IconButton, Tooltip } from '@mui/material'
import VoicemailOutlinedIcon from '@mui/icons-material/VoicemailOutlined';
import { sendToVoicemail } from '../../helpers/sendToVoicemail'

const VoicemailButton = (props) => {
  const task = props.task.attributes

  const handleClick = () => {
    let customerCallSid = task.conference.participants.customer
    sendToVoicemail({
      mode: "redirect",
      serverlessDomain: process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN, 
      customerCallSid: customerCallSid, 
      promptUrl: `${process.env.FLEX_APP_TWILIO_SERVERLESS_DOMAIN}/SampleRecording.mp3`
    })
  }
  return (
    <div>
        <Tooltip title={"Play message"}>
          <IconButton aria-label="voicemail" onClick={()=> handleClick()} size={"large"}>
              <VoicemailOutlinedIcon />
          </IconButton>
        </Tooltip>

    </div>
  )
}

export default  withTaskContext(VoicemailButton)