import { UniversalPortal } from '@jesstelford/react-portal-universal'
import { useState } from 'react'
import { getAllCronJobs, addCronJob } from 'services/cronjob'
import { getCookies, getToken } from 'utils/cookies'
import { createSchedulingOfValues } from 'utils/util'
import Table from 'common/table/'
import CronJob from 'models/cronjob'
import CronJobList from 'models/cronjob-list'
import Modal from 'common/modal'
import Overlay from 'common/overlay'
import Wrapper from 'common/wrapper'
import CronJobForm from 'components/home/cronjob-form'

export async function getServerSideProps(ctx) {
  const { user_token: token, ...payload } = await getToken(ctx)
  const newToken = `${payload.token_type} ${payload.access_token}`
  const data = await getAllCronJobs(token || newToken)
  
  return {
    props: {
      cronjobs: data,
      token: payload || null
    }
  } 
}

export default function CronJobPage({ cronjobs = [] }) {
  const [isActiveModal, setIsActiveModal] = useState(false)
  const ids = [1, 2, 3].map(id => ({ value: id, tile: id }))
  const headCells = CronJob.cronJobHeadCells()
  const bodyRows = new CronJobList(cronjobs).createDataRows()
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
    console.log(scheduling)
    const { user_token: token } = getCookies()
    const res = await addCronJob(token, payload)
    console.log(res)
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
          rows={bodyRows}
          headCells={headCells}
          title="CronJobs"
        />
      </Wrapper>
    </>
  )
}