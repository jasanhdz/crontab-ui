import { createHeadCell } from 'utils/util'

class Workflow {
  constructor(id, name, description, created_at, updated_at) {
    this.id = id
    this.name = name
    this.description = description
    this.updated_at = updated_at
    this.created_at = created_at
  }

  getBasicWorkflow() {
    return {
      name: this.name,
      description: this.description,
    }
  }

  static BasicWorkflowSkelleton() {
    const workflow = new Workflow('', '', '', '', '')
    return workflow.getBasicWorkflow()
  }

  static workflowByPayload(payload) {
    const { id, created_at, updated_at, name, description } = payload
    const workflow = new Workflow(id, name, description, created_at, updated_at)
    return workflow
  }

  static workflowHeadCells() {
    const workflow = new Workflow('', '', '', '', '')
    const keys = Object.keys(workflow)
    const cells = keys.map(key => {
      if(key === 'id') return createHeadCell(key, true)
      return createHeadCell(key)
    })
    return {
      keys,
      headCells: [ ...cells, createHeadCell('action') ]
    }
  }
}

export default Workflow