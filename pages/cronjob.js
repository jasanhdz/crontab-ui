import { useState } from 'react'
import { UniversalPortal } from '@jesstelford/react-portal-universal'
import { getAllCronJobs, addCronJob, deleteCronJob } from 'services/cronjob'
import { getCookies, getToken } from 'utils/cookies'
import { createSchedulingOfValues } from 'utils/util'
import { getAllWorkflows } from 'services/workflow'
import Table from 'common/table/'
import CronJob from 'models/cronjob'
import CronJobList from 'models/cronjob-list'
import Modal from 'common/modal'
import Overlay from 'common/overlay'
import Wrapper from 'common/wrapper'
import CronJobForm from 'cronjob/cronjob-form'

export async function getServerSideProps(ctx) {
  const { user_token: token, ...payload } = await getToken(ctx)
  const newToken = `${payload.token_type} ${payload.access_token}`
  const cronjobs = await getAllCronJobs(token || newToken)
  const workflows = await getAllWorkflows(token || newToken)
  
  return {
    props: {
      cronjobs,
      workflows,
      token: payload || null
    }
  } 
}

export default function CronJobPage({ cronjobs = [], workflows = [] }) {
  const [jobs, setJobs] = useState(cronjobs)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const ids = workflows.map(work => ({ value: work.id, tile: work.id }))
  const cells = CronJob.cronJobHeadCells()
  const bodyRows = new CronJobList(jobs).createDataRows()
  const basicCron = CronJob.BasicCronJobSkelleton()

  const handleToggleModal = (event) => {
    setIsActiveModal(!isActiveModal)
  }

  const handleSubmit = async (values) => {
    const { name, description, workflow_id } = values
    const scheduling = createSchedulingOfValues(values, true)
    const payload = {
      workflow_id,
      name,
      description,
      scheduling
    }
    const { user_token: token } = getCookies()
    const res = await addCronJob(token, payload)
    if (res.success) {
      setIsActiveModal(false)
      const newJob = CronJob.CronJobByPayload(res.payload)
      console.log(newJob)
      setJobs([...jobs, newJob])
    }
  }

  const handleDeleteItems = (selected, setSelected) => {
    const { user_token: token } = getCookies()
    const requests = selected.map(id => deleteCronJob(token, id))
    Promise
    .all(requests)
    .then((responses) => {
      console.log(responses)
      const newJobs = jobs.filter((job) => {
        if (selected.indexOf(job.id) === -1) return job
      })
      setJobs(newJobs)
      setSelected([])
    })
    .catch((error) => console.error(error.message))
  }


  return (
    <>
      <UniversalPortal selector="#page-portal">
        {isActiveModal && (
          <Overlay isActive>
            <Modal onClose={handleToggleModal}>
              <CronJobForm handleOnSubmit={handleSubmit} cronjob={basicCron} workflows={ids} />
            </Modal>
          </Overlay>
        )}
      </UniversalPortal>
      <Wrapper>
        <h1>Cron Jobs All</h1>
        <Table
          handleToggleModal={handleToggleModal}
          onDeleteItems={handleDeleteItems}
          rows={bodyRows}
          cells={cells}
          title="CronJobs"
        />
      </Wrapper>
    </>
  )
}