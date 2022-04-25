// 705.484.450-52 070.987.720-03
class ValidaCPF { //cria uma nova classe
  constructor(cpfEnviado) { //um construtor com um valor de nome cpfEnviado
    Object.defineProperty(this, 'cpfLimpo', { //cria um novo valor com propriedades predefinidas. cpfEnviado passa para 'cpfLimpo'
      writable: false, //proibe que seja reescrito
      enumerable: true, //proibe sua exibição
      configurable: false, //proibe sua reconfiguração posterior
      value: cpfEnviado.replace(/\D+/g, '') //remove caracteres que não são numeros do cpfEnviado que agora é o 'cpfLimpo'
    });
  }

  valida() { //valida se o cpf é valido(true) ou invalido(false)
    if(!this.cpfLimpo) return false; //se não tiver valor em cpfLimpo retorna falso
    if(typeof this.cpfLimpo !== 'string') return false; //se o cpfLimpo que era o enviado, for diferente de uma string, retorna falso
    if(this.cpfLimpo.length !== 11) return false; //se o tamanho de cpfLimpo for diferente de 11 retorna falso
    if(this.éSequência()) return false;//verifica se o cpfLimpo é uma sequencia de numeros iguais
    this.geraNovoCpf(); //ativa o novo metodo

    return this.novoCPF === this.cpfLimpo; //verifica se o valor de this.novoCPF é igual ao de this.cpfLimpo
  }


  éSequência() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo; //repete o valor do primeiro caractere do cpf limpo 11vezes e verifica
                                                                 //se é igual ao valor de cpfLimpo 
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2); //separa cada valor/string do cpfLimpo em um array e pega somente os de 0 a -2 ou seja 9
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos); //adiciona um caractere a mais no cpfSemDigitos
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1); //adiciona um caractere a mais no cpfSemDigitos
    this.novoCPF = cpfSemDigitos + digito1 + digito2; //gera um novo CPF com os dois caracteres novos
  }

  static geraDigito(cpfSemDigitos) {
    let total = 0; //total da conta de todos os valores do cpf
    let reverso = cpfSemDigitos.length + 1; //valor de cpfSemdDigitos + 1 9 na primeira vez, 10 na segunda e 11 na ultima vez do laço

    for(let stringNumerica of cpfSemDigitos) { 
      total += reverso * Number(stringNumerica); //laço para calcular o total de valores do cpf
      reverso--; //contagem regressiva de valor que começa de 11
    }

    const digito = 11 - (total % 11); //calculo do primeiro digito
    return digito <= 9 ? String(digito) : '0'; //define como 0 se o digito for maior que 9
  }

}

// let validacpf = new ValidaCPF('070.987.720-03');
// // validacpf = new ValidaCPF('999.999.999-99');

// if (validacpf.valida()) {
//   console.log('CPF válido');
// } else {
//   console.log('CPF inválido');
// }
