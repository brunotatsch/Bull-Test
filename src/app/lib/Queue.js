

import Queue from 'bull';
import redisConfig from '../../config/redis.js';
import * as jobs from '../jobs/index.js';

// { RegistrationMail: {  Key , handle}}
const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  option: job.option,
}));

export default {
  queues,
  add(name, data)
  {
    const queue = this.queues.find(queue => queue.name === name);
    //console.log(queue);
    return queue.bull.add(data, queue.option);

  },
  process()
  {
    return this.queues.forEach(queue =>
    {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log(`Job ${queue.bull.name} failed: ${err}`);
      }).on("completed", (job, result) =>
      {
        console.log(`Job completed ${queue.bull.name}`);
      })
    });
  },
  remove(name) {
    const queue = this.queues.find(queue => queue.name === name);

    return queue.bull.remove(queue.bull.name);

  }
}