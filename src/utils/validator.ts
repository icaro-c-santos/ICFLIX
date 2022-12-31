export const validatorPassword = (value: string): string[] => {
  let erros: string[] = [];
  if (value.length < 8) {
    erros.push("PELO MENOS 8 CARACTERS.");
  }
  if (value.length > 10) {
    erros.push("NO MAXIMO 10 CARACTERS.");
  }
  if (!value.match(/\d{2}/g)) {
    erros.push("PELO MENOS 2 NUMEROS.");
  }
  if (!value.match(/\@|\#|\$|\%|\!|\&|\?|\*/g)) {
    erros.push("PELO MENOS 1 CARACTERE ESPECIAL: !-@-#-$-%-&-?-*");
  }
  return erros;
};

export const validatorLogin = (value: string): string[] => {
  let erros: string[] = [];
  if(value.length<=0){
    erros.push("LOGIN NÃO PODE FICAR EM BRANCO")
  }
  return erros;
};

export const validatorName = (value: string): string[] => {
  let erros: string[] = [];
  if(value.length<=0){
    erros.push("NOME NÃO PODE FICAR EM BRANCO")
  }
  return erros;
};
