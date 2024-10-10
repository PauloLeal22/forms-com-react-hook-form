import { useForm, Controller } from "react-hook-form";
import { Button, Label, Fieldset, Input, Form, Titulo, ErrorMessage } from "../../components";
import InputMask from "../../components/InputMask";
import { useEffect } from "react";

interface FormInputTipos {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  senhaConfirmacao: string;
}

const CadastroPessoal = () => {

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, watch, control, reset } = useForm<FormInputTipos>({
    mode: 'all',
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      senhaConfirmacao: '',
      telefone: ''
    }
  });

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados);
  }

  const senha = watch('senha');

  const validaSenha = {
    obrigatorio: (valor: string) => !!valor || 'Insira a senha novamente',
    tamanhoMinimo: (valor: string) => valor.length >= 6 || 'A senha deve possuir pelo menos 6 caracteres',
    senhaIgual: (valor: string) => valor === senha || 'As senhas não correspondem'
  }

  function validarEmail(valor: string) {
    const formatoEmail = /^[^\s@]+@alura\.com\.br$/;

    if (!formatoEmail.test(valor)) {
      return false;
    }

    return true;
  }

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            $error={!!errors.nome}
            {...register('nome', { required: 'Campo obrigatório', minLength: { value: 3, message: 'O nome deve possuir pelo menos 3 caracteres' } })}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            $error={!!errors.email}
            {...register('email', { required: 'Campo obrigatório', validate: value => validarEmail(value) })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Controller
          control={control}
          name='telefone'
          rules={{ required: 'Campo obrigatório', pattern: { value: /^\(\d{2,3}\) \d{5}-\d{4}$/, message: 'Formato incorreto' } }}
          render={({ field }) => (
            <Fieldset>
              <Label>Telefone</Label>
              <InputMask mask="(99) 99999-9999" placeholder="Ex: (DDD) XXXXX-XXXX" $error={!!errors.telefone} onChange={field.onChange}/>
              {errors.telefone && <ErrorMessage>{errors.telefone.message}</ErrorMessage>}
            </Fieldset>
          )}
        />
        
        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            $error={!!errors.senha}
            {...register('senha', { required: 'Campo obrigatório', minLength: { value: 6, message: 'A senha deve possuir pelo menos 6 caracteres' } })}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            $error={!!errors.senhaConfirmacao}
            {...register('senhaConfirmacao', { required: 'Campo obrigatório', validate: validaSenha })}
          />
          {errors.senhaConfirmacao && <ErrorMessage>{errors.senhaConfirmacao.message}</ErrorMessage>}
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
