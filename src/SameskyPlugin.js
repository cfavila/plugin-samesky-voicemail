import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';


import registerNotifications from "./utils/notifications"
import voicemail  from './components/voicemail/voicemail'

const PLUGIN_NAME = 'SameskyPluginVoicemail';

export default class SameskyPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {

    //  disable the main Flex CRM Pane
    flex.AgentDesktopView.defaultProps.showPanel2 = false;
    
    registerNotifications(manager)
    voicemail(flex, manager)
  }
}
