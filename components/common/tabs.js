import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    boxShadow: 'none',
  },
  tabs: {
    fontWeight: 600,
  }
}))

export default function Tabbs({ options }) {
  const matches = useMediaQuery('(min-width:900px)');
  const clasess = useStyles()
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className={clasess.root}>
      <AppBar className={clasess.appBar} position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          variant={matches ? 'fullWidth' : 'scrollable'}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          className={clasess.tabs}
        >
          {options.map((item, idx) => <Tab key={idx} label={item.title} {...a11yProps(idx)} /> )}
        </Tabs>
      </AppBar>
      {options.map((item, idx) => <TabPanel key={idx} value={value} index={idx} >{item.component}</TabPanel>)}
    </div>
  )
}
