import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import { useState } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Tabbs({ options }) {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
        >
          {options.map((item, idx) => <Tab key={idx} label={item.title} {...a11yProps(idx)} /> )}
        </Tabs>
      </AppBar>
      {options.map((item, idx) => <TabPanel key={idx} value={value} index={idx} >{item.component}</TabPanel>)}
    </div>
  )
}
