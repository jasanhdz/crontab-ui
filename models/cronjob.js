import { createHeadCell } from 'utils/util'

class CronJob {
  constructor(id, name, description, scheduling, workflow_id, updated_at, created_at) {
    this.id          = id
    this.name        = name
    this.description = description
    this.scheduling  = scheduling
    this.workflow_id = workflow_id
    this.updated_at  = updated_at
    this.created_at  = created_at
  }

  getBasicCronJob() {
    return {
      name: this.name,
      description: this.description,
      scheduling: this.scheduling,
      workflow_id: this.workflow_id
    }
  }

  static BasicCronJobSkelleton() {
    const cronJob = new CronJob(null, '', '', '', 1, null, null)
    return cronJob.getBasicCronJob()
  }

  static cronJobHeadCells() {
    const cells = [
      createHeadCell('name'),
      createHeadCell('description'),
      createHeadCell('scheduling'),
      createHeadCell('id', true),
      createHeadCell('updated_at'),
      createHeadCell('created_at'),
      createHeadCell('action'),
    ] 
    return cells
  }
}

export default CronJob