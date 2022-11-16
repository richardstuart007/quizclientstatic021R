//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Sub Components
//
import QuizSettings from './QuizSettings/QuizSettings'
import QuizSplash from './QuizSplash/QuizSplash'
import QuizSelect from './QuizSelect/QuizSelect'
import Quiz from './Quiz/Quiz'
import QuizReview from './QuizReview/QuizReview'
import QuizRefs from './QuizRefs/QuizRefs'
//
//  Static Data
//
import QuizStaticData from '../datastatic/QuizStaticData'
//
//  Utilities
//
import { ValtioStore } from './ValtioStore'
//
// Debug Settings
//
const debugLog = debugSettings()
//
//  Global Variables
//
let g_Params
let g_HideParams
let g_Page
let g_DataLoad
let g_SignedIn
//===================================================================================
function QuizControl() {
  if (debugLog) console.log('Start QuizControl')
  //.............................................................................
  //.  Unpack Parameters
  //.............................................................................
  const UnpackParams = () => {
    if (debugLog) console.log('Get Parameters')
    //
    //  Set Params Load already done
    //
    g_Params = false
    ValtioStore.v_Params = g_Params
    //
    //  Get Query string of Parameters
    //
    const queryString = window.location.search
    if (debugLog) console.log('queryString ', queryString)
    if (!queryString) return
    //
    //  Update the Store
    //
    if (debugLog) console.log('Has Parameters')
    g_Params = true
    ValtioStore.v_Params = g_Params

    const urlParams = new URLSearchParams(queryString)
    //..............................
    //.  Dev Mode
    //..............................
    const Devmode = urlParams.get('Devmode')
    if (Devmode) {
      if (Devmode === 'true') {
        ValtioStore.v_ShowButtonHelp = true
        ValtioStore.v_ShowButtonSettings = true
        ValtioStore.v_ShowSelectionOwner = true
        ValtioStore.v_ShowSelectionGroup1 = true
        ValtioStore.v_ShowSelectionGroup2 = true
        ValtioStore.v_ShowSelectionGroup3 = true
        ValtioStore.v_ShowInfo = true
      }
    }
    //..............................
    //.  Show Overrides
    //..............................
    const ShowButtonHelp = urlParams.get('ShowButtonHelp')
    if (ShowButtonHelp && ShowButtonHelp === 'true')
      ValtioStore.v_ShowButtonHelp = true

    const ShowButtonSettings = urlParams.get('ShowButtonSettings')
    if (ShowButtonSettings && ShowButtonSettings === 'true')
      ValtioStore.v_ShowButtonSettings = true

    const ShowSelectionOwner = urlParams.get('ShowSelectionOwner')
    if (ShowSelectionOwner && ShowSelectionOwner === 'true')
      ValtioStore.v_ShowSelectionOwner = true

    const ShowSelectionGroup1 = urlParams.get('ShowSelectionGroup1')
    if (ShowSelectionGroup1 && ShowSelectionGroup1 === 'true')
      ValtioStore.v_ShowSelectionGroup1 = true

    const ShowSelectionGroup2 = urlParams.get('ShowSelectionGroup2')
    if (ShowSelectionGroup2 && ShowSelectionGroup2 === 'true')
      ValtioStore.v_ShowSelectionGroup2 = true

    const ShowSelectionGroup3 = urlParams.get('ShowSelectionGroup3')
    if (ShowSelectionGroup3 && ShowSelectionGroup3 === 'true')
      ValtioStore.v_ShowSelectionGroup3 = true

    const ShowInfo = urlParams.get('ShowInfo')
    if (ShowInfo && ShowInfo === 'true') ValtioStore.v_ShowInfo = true

    //..............................
    //.  Selection
    //..............................
    const AllowSelection = urlParams.get('AllowSelection')
    if (debugLog) console.log('AllowSelection ', AllowSelection)
    if (AllowSelection) {
      AllowSelection === 'true'
        ? (ValtioStore.v_AllowSelection = true)
        : (ValtioStore.v_AllowSelection = false)
    }

    const Owner = urlParams.get('Owner')
    if (Owner) ValtioStore.v_Owner = Owner
    if (debugLog) console.log('Owner ', Owner)

    const Group1 = urlParams.get('Group1')
    if (Group1) ValtioStore.v_Group1 = Group1
    if (debugLog) console.log('Group1 ', Group1)

    const Group2 = urlParams.get('Group2')
    if (Group2) ValtioStore.v_Group2 = Group2

    const Group3 = urlParams.get('Group3')
    if (Group3) ValtioStore.v_Group3 = Group3
    //..............................
    //.  Remove Parameters
    //..............................
    if (g_HideParams) {
      if (debugLog) console.log('Hide Parameters')
      // eslint-disable-next-line
      history.replaceState({}, null, 'Params')
    }
  }
  //.............................................................................
  //.  Process Restart
  //.............................................................................
  const Restart = () => {
    if (debugLog) console.log('Restart')
    //
    //  Load Static data to Store (Once only)
    //
    if (debugLog) console.log('g_DataLoad ', g_DataLoad)
    if (g_DataLoad) {
      g_DataLoad = false
      ValtioStore.v_DataLoad = g_DataLoad

      if (debugLog) console.log('call QuizStaticData ')
      QuizStaticData()
    }
    if (debugLog) console.log(`Override Page: ${g_Page} to QuizSelect`)
    ValtioStore.v_Page = 'QuizSelect'
    g_Page = 'QuizSelect'
  }
  //.............................................................................
  //  Main Line
  //.............................................................................
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Load Store values
  //
  g_Params = snapShot.v_Params
  g_HideParams = snapShot.v_HideParams
  g_Page = snapShot.v_Page
  g_SignedIn = snapShot.v_SignedIn
  g_DataLoad = snapShot.v_DataLoad
  if (debugLog) console.log('g_HideParams ', g_HideParams)
  if (debugLog) console.log('g_Params ', g_Params)
  if (debugLog) console.log('g_DataLoad ', g_DataLoad)
  if (debugLog) console.log('g_SignedIn ', g_SignedIn)
  if (debugLog) console.log('g_Page ', g_Page)
  //
  //  Get the URL Parameters (once only)
  //
  if (g_Params === null) {
    UnpackParams()
  }
  //
  //  Override the page if QuizRestart (QuizSelect/QuizServerData)
  //
  if (g_Page === 'QuizRestart') Restart()
  //
  //  Present the selected component
  //
  switch (g_Page) {
    case 'QuizSplash':
      return <QuizSplash />
    case 'QuizSettings':
      return <QuizSettings />
    case 'QuizSelect':
      return <QuizSelect />
    case 'QuizRefs':
      return <QuizRefs />
    case 'Quiz':
      return <Quiz />
    case 'QuizReview':
      return <QuizReview />
    default:
      return <QuizSplash />
  }
}

export default QuizControl
