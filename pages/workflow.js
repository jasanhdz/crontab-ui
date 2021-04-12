import { useState } from 'react'
import { UniversalPortal } from '@jesstelford/react-portal-universal'
import { addWorkflow, getAllWorkflows, deleteWorkflow } from 'services/workflow'
import createToken from 'services/createToken'
import Wrapper from 'common/wrapper'
import Workflow from 'models/workflow'
import WorkflowList from 'models/workflow-list'
import Table from 'common/table/'
import Modal from 'common/modal'
import Overlay from 'common/overlay'
import WorkFlowForm from 'workflow/workflow-form'
import { getCookies } from 'utils/cookies'

export async function getServerSideProps(ctx) {
  const { access_token: token } = await createToken()
  const data = await getAllWorkflows(token)
  
  return { props: { workflows: data } }
}

export default function WorkflowPage({ workflows = [] }) {
  const [works, setWorks] = useState(workflows)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const cells = Workflow.workflowHeadCells()
  const dataRows = new WorkflowList(works).createDataRows()
  const basicWorkFlow = Workflow.BasicWorkflowSkelleton()

  const handleToggleModal = (event) => {
    setIsActiveModal(!isActiveModal)
  }

  const handleSubmit = async (values) => {
    const { user_token: token } = getCookies()
    const res = await addWorkflow(token, values)
    if (res.success) {
      const newWorkflow = Workflow.workflowByPayload(res.payload) 
      setWorks([...works, newWorkflow])
      setIsActiveModal(false)
    }
  }

  const handleDeleteItems = (selected, setSelected) => {
    const { user_token: token } = getCookies()
    const requests = selected.map((id) => deleteWorkflow(token, id))
    Promise
      .all(requests)
      .then((responses) => {
        console.log(responses)
        const newWorks = works.filter((work) => {
          if(selected.indexOf(work.id) === -1) return work

        })
        setWorks(newWorks)
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
              <h2>Agrega un nuevo WorkFlow</h2>
              <WorkFlowForm workflow={basicWorkFlow} onSubmit={handleSubmit} />
            </Modal>
          </Overlay>
        )}
      </UniversalPortal>
      <Wrapper>
        <h1>WorkFlows all</h1>
        <Table
          handleToggleModal={handleToggleModal}
          onDeleteItems={handleDeleteItems}
          rows={dataRows}
          cells={cells}
          title="Workflows"
        />
      </Wrapper>
    </>
  )
}