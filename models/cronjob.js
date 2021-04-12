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

  static CronJobByPayload(payload) {
    const { id, name, description, scheduling, workflow_id, updated_at, created_at } = payload
    const cronjob = new CronJob(id, name, description, scheduling, workflow_id, updated_at, created_at)
    return  cronjob
  } 

  static cronJobHeadCells() {
    const keys = ['name', 'description', 'scheduling', 'id', 'updated_at', 'created_at']
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

export default CronJob