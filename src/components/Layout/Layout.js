//
//  Libraries
//
import {
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Grid,
  CardMedia
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSnapshot } from 'valtio'
//
//  Common Sub Components
//
import QuizNavigation from '../../pages/Common/QuizNavigation'
//
//  Utilities
//
import { ValtioStore } from '../../pages/ValtioStore'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import cards from '../../assets/images/cards.svg'
import Ukraine from '../../assets/images/Ukraine.svg'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    page: {
      background: 'whitesmoke',
      width: '100%',
      padding: theme.spacing(1)
    },
    root: {
      display: 'flex'
    },
    title: {
      marginLeft: theme.spacing(2)
    },
    appBar: {
      background: 'green',
      width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
export default function Layout({ children }) {
  if (debugLog) console.log('Start Layout')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Style overrides
  //
  const classes = useStyles()
  //
  //  Screen Width
  //
  const theme = useTheme()
  const ScreenMedium = useMediaQuery(theme.breakpoints.up('sm'))
  //
  //  Title
  //
  let title
  const CurrentPage = snapShot.v_Page

  switch (CurrentPage) {
    case 'QuizSettings':
      title = 'Settings'
      break
    case 'QuizSelect':
      title = 'Selection'
      break
    case 'QuizRefs':
      title = 'References'
      break
    case 'Quiz':
      title = 'Quiz'
      break
    case 'QuizReview':
      title = 'Review'
      break
    default:
      title = CurrentPage
      break
  }
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      {/* .......................................................................................... */}
      {/* app bar                                         */}
      {/* .......................................................................................... */}
      <AppBar
        position='fixed'
        className={classes.appBar}
        elevation={0}
        color='primary'
      >
        <Toolbar>
          <Grid container alignItems='center'>
            {/* .......................................................................................... */}
            <Grid item>
              <Avatar className={classes.avatar} src={cards} />
            </Grid>
            {/* .......................................................................................... */}
            <Grid item>
              <Typography className={classes.title}>{title}</Typography>
            </Grid>
            {/* .......................................................................................... */}
            <Grid item xs></Grid>
            {/* .......................................................................................... */}
            <Grid>
              <CardMedia
                component='img'
                sx={{ width: 30, height: 30 }}
                image={Ukraine}
                alt=''
              />
            </Grid>
            {/* .......................................................................................... */}
            {ScreenMedium && <QuizNavigation />}
            {/* .......................................................................................... */}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* .......................................................................................... */}
      {/* main content                          */}
      {/* .......................................................................................... */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {!ScreenMedium && <QuizNavigation />}
        {children}
      </div>
    </div>
  )
}
