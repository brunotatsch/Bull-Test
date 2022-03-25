export default {
  key: 'UserReport',
  option: {
    delay: 15000,
  },
  async handle({ data}) {
    const { user } = data;

   console.log(user);

  }
}