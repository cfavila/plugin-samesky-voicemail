import React from 'react'

import VoicemailButton from './VoicemailButton'
import VoicemailButtonOption from './VoicemailButtonOption'

const voicemail = (flex, manager) => {

    flex.CallCanvasActions.Content.add(<VoicemailButton key="voicemail" flex={flex} manager={manager}/>,
    {
      sortOrder: -1,
      align: 'start',
    })
    flex.CallCanvas.Content.add(<VoicemailButtonOption key="voicemailOption" flex={flex} manager={manager}/>,{
      sortOrder : -1,
      align: 'end'
    })


}

export default voicemail