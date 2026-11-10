import { Queue, Password, type PasswordType, type ServiceType } from "./queue";

var filaNormal: Queue = new Queue();
var filaPreferencial: Queue = new Queue();

var senhasPossiveisNormal: PasswordType = {
  agendamento: ["NA001", "NA002", "NA003", "NA004"],
  consulta: ["NC001", "NC002", "NC003", "NC004"],
  exame: ["NE001", "NE002", "NE003", "NE004"],
};

var senhasPossiveisPreferencial: PasswordType = {
  agendamento: ["PA001", "PA002", "PA003", "PA004"],
  consulta: ["PC001", "PC002", "PC003", "PC004"],
  exame: ["PE001", "PE002", "PE003", "PE004"],
};

var nextPreferencial: boolean = true;

export function pegarSenha(preferencial: boolean, tipoSenha: ServiceType) {
  if (preferencial) {
    let index: number = Math.floor(
      Math.random() * senhasPossiveisPreferencial[tipoSenha].length,
    );
    let senha: string = senhasPossiveisPreferencial[tipoSenha][index];
    delete senhasPossiveisPreferencial[tipoSenha][index];
    const senhaFormatada = new Password(senha);
    filaPreferencial.add(senhaFormatada);
    console.log(filaPreferencial);

    return senhaFormatada.code;
  } else {
    let index: number = Math.floor(
      Math.random() * senhasPossiveisNormal[tipoSenha].length,
    );
    let senha: string = senhasPossiveisNormal[tipoSenha][index];
    delete senhasPossiveisNormal[tipoSenha][index];
    const senhaFormatada = new Password(senha);
    filaNormal.add(senhaFormatada);
    console.log(filaNormal);

    return senhaFormatada.code;
  }
}

export function chamarSenha() {
  if (nextPreferencial && !filaPreferencial.isEmpty()) {
    let senhaChamada: Password = filaPreferencial.remove();
    switch (senhaChamada.code[1]) {
      case "A":
        senhasPossiveisPreferencial.agendamento.push(senhaChamada.code);
        break;
      case "C":
        senhasPossiveisPreferencial.consulta.push(senhaChamada.code);
        break;
      case "E":
        senhasPossiveisPreferencial.exame.push(senhaChamada.code);
        break;
    }
    nextPreferencial = false;
    return senhaChamada;
  } else {
    let senhaChamada: Password = filaNormal.remove();
    switch (senhaChamada.code[1]) {
      case "A":
        senhasPossiveisNormal.agendamento.push(senhaChamada.code);
        break;
      case "C":
        senhasPossiveisNormal.consulta.push(senhaChamada.code);
        break;
      case "E":
        senhasPossiveisNormal.exame.push(senhaChamada.code);
        break;
    }
    nextPreferencial = true;
    return senhaChamada;
  }
}

export function listarSenhas(preferencial: boolean) {
  if (preferencial) {
    let current_node = filaPreferencial.getHead();
    while (Object.keys(current_node).length != 0) {
      //Object is not empty
      console.log(current_node.code); // adaptar isso para fazer a lista no front
      current_node = current_node.next;
      return filaPreferencial.toArray();
    }
  } else {
    let current_node = filaNormal.getHead();
    while (Object.keys(current_node).length != 0) {
      //Object is not empty
      console.log(current_node.code); // adaptar isso para fazer a lista no front
      current_node = current_node.next;
      return filaNormal.toArray();
    }
  }
}
