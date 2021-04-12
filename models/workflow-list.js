import { getTimeAgo } from 'utils/get-date'

class WorkflowList {
  constructor(wordflows = []) {
    this.list = wordflows
  }

  createDataRows() {
    return this.list.map(item => ({
      id: Number(item.id),
      name: item.name,
      description: item.description,
      updated_at: getTimeAgo(new Date(item.updated_at).getTime()),
      created_at: getTimeAgo(new Date(item.created_at).getTime())
    }))
  }
}

export default WorkflowList