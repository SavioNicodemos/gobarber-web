import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string().required('Senha obrigatória'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), undefined],
    'Senhas não coincidem',
  ),
});
