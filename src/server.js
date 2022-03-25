import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController.js';
import Queue from "../src/app/lib/Queue.js";

import Bull from 'bull';
import redisConfig from './config/redis.js';


const app = express(); 
app.use(express.json());

app.post('/users', UserController.store);

//await Queue.add("Job1Min", {});
const job = new Bull("Job1Min", redisConfig);

const jobs = await job.getJobs();

//Bull.removeRepeatableByKey("Job1Min");
console.log(jobs.length);
console.log({opts:jobs[0].opts});
//console.log({jobs});

//await job.removeRepeatableByKey("repeat:06ff7e943c0b9a35a957a28ad1155a1b:1648241760000");

await job.removeRepeatable(jobs[0].name, jobs[0].opts.repeat, jobs[0].opts.jobId);
console.log(jobs.length);

//await job.remove();

app.listen(3333, () =>
{
  console.log('Server started on port 3333')
});
