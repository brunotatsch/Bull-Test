export default {
  key: 'Job1Min',
  option: {
     repeat: { cron: '* * * * *' } ,
  },
  async handle() {
    let date = new Date();

   console.log(date);

  }
}