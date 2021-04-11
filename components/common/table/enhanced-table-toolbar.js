import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircle from '@material-ui/icons/AddCircle'
import { lighten, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { UniversalPortal } from '@jesstelford/react-portal-universal'
import Modal from 'common/modal'
import Overlay from 'common/overlay'
import { useState } from 'react'
import CronJobForm from 'components/home/cronjob-form'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

export default function EnhancedTableToolbar (props) {
  const classes = useToolbarStyles()
  const [isActiveModal, setIsActiveModal] = useState(false)
  const { numSelected, title } = props;
  const ids = [1, 2, 3].map(id => ({ value: id, tile: id }))
  const cronJob = {
    description: '',
    name: '',
    scheduling: '',
    workflow_id: null,
  }
  const handleSubmit = values => {
    const { seconds, minutes, hours, days, month, year, name, description, workflow_id } = values
    const scheduling = `${seconds.value || '*'} ${minutes.value || '*'} ${hours.value || '*'} ${days.OF_MONTH.value || '?'} ${month.value} ${days.OF_WEEKDAY.value || '*'} ${year.value || '*'}`
    console.log(scheduling)
  }

  const handleClick = event => {
    console.log('delete file')
  }

  const handleToggleModal = event => {
    setIsActiveModal(!isActiveModal)
  }

  return (
    <>
      <UniversalPortal selector="#page-portal">
        {isActiveModal && (
          <Overlay isActive>
            <Modal onClose={handleToggleModal}>
              <CronJobForm handleOnSubmit={handleSubmit} cronjob={cronJob} workflows={ids} />
            </Modal>
          </Overlay>
        )}
      </UniversalPortal>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon onClick={handleClick} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Agregar CronJob">
            <IconButton aria-label="agregar cronjob">
              <AddCircle onClick={handleToggleModal} fontSize="large" color="action" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}