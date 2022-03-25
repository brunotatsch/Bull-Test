import Mail from '../lib/Mail.js'

export default {
  key: 'RegistrationMail',
  async handle({ data}) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Queue Test <queue@queue.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuários",
      html: `Olá ${user.name}, seja bem vindo ao sistema de filas.`
    });

  }
}