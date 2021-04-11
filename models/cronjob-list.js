import { getTimeAgo } from 'utils/get-date'

class CronJobList {
  constructor(cronjobs = []) {
    this.list = cronjobs
  }

  createDataRows() {
    return this.list.map(item => ({
      name: item.name,
      description: item.description,
      scheduling: item.scheduling,
      id: Number(item.id),
      updated_at: getTimeAgo(new Date(item.updated_at).getTime()),
      created_at: getTimeAgo(new Date(item.created_at).getTime())
    }))
  }
}

export default CronJobList