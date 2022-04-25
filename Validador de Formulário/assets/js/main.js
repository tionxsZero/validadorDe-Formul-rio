class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario'); //pegando o formulário html pela classe
    this.eventos(); //executando um metodo.
  }

  eventos() {
    this.formulario.addEventListener('submit', e => { 
      this.handleSubmit(e); //impedindo a execução do submit
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos(); //camposValidos recebem o resultado de this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas(); //senhasValidas recebem o resultado de this.senhasSaoValidas();

    if(camposValidos && senhasValidas) {   //Checa se o resultado de camposValidos e  senhasValidas é verdadeiro
      alert('Formulário enviado.'); 
      this.formulario.submit(); //Executa a ação do botao e do formulário mediante verificação verdadeira
    }
  }

  senhasSaoValidas() { //Verifica se as senhas são validas
    let valid = true; //flag predefinindo o valor de senhas validas.

    const senha = this.formulario.querySelector('.senha'); //variavel pegando o campo senha do formulário pela classe .senha
    const repetirSenha = this.formulario.querySelector('.repetir-senha'); //variavel pegando o campo senha do formulário pela classe .senha

    if(senha.value !== repetirSenha.value) { //Verificando se o valor de senha e repetir senha são diferentes
      valid = false; //define o valor de valid para false
      this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.'); //cria o erro na tela após o campo senha
      this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.'); //cria o erro na tela após o campo repetirSenha
    }

    if(senha.value.length < 6 || senha.value.length > 12) { //verifica se o valores do campo senha não estão entre 6 e 12 caracteres
      valid = false; //define para falso o valor da flag 
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.'); //joga o erro no formulario após o campo senha
    }

    return valid; //retorna o valor de valid para o metodo
  }

  camposSaoValidos() { 
    let valid = true; //flag predefinindo o valor de campos validos.

    for(let errorText of this.formulario.querySelectorAll('.error-text')) { // caso algum erro tenha sido enviado antes, remove os anteriores
      errorText.remove(); // caso algum erro tenha sido enviado antes, remove os anteriores
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) { //laço de repetição para pegar todos os campos com a classe validar
      const label = campo.previousElementSibling.innerText; //definindo que campo vai ser igual ao label que vem antes do input

      if(!campo.value) { //se o campo estiver vazio
        this.criaErro(campo, `Campo "${label}" não pode estar em branco.`); //cria o erro 
        valid = false; //define a flag como false
      }

      if(campo.classList.contains('cpf')) { //verifica se o campo que contem CPF é valido ou não chamando outro script  validaCPF que contem
        if(!this.validaCPF(campo)) valid = false; // a classe ValidaCPF
      }

      if(campo.classList.contains('usuario')) { //verifica o campo que contem a classe usuário
        if(!this.validaUsuario(campo)) valid = false; //se o campo estiver vazio a flag é false para o metodo
      }

    }

    return valid; //retorna o valor de valid para o metodo.
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(campo) { //metodo que chama a classe ValidaCPF de dentro do outro script
    const cpf = new ValidaCPF(campo.value); //instancia o cpf do outro script que tem a classe ValidaCPF
                                            //permitindo o uso no script atual

    if(!cpf.valida()) { //verifica se o CPF é invalido
      this.criaErro(campo, 'CPF inválido.'); 
      return false; //retorna falso se for 
    }

    return true;//se estiver correto retorna true
  }

  criaErro(campo, msg) { //cria o erro dentro do html
    const div = document.createElement('div') //cria uma div
    div.innerHTML = msg; //dentro da div cria uma msg
    div.classList.add('error-text'); //adicionar a classe erro-text dentro do html e da div adicionada que agora tem um texto.
    campo.insertAdjacentElement('afterend', div); //posiciona a div com texto e a classe depois do campos
  }
}

const valida = new ValidaFormulario(); //instancia a classe principal ValidaFormulario(); com todas as regras e verificações
