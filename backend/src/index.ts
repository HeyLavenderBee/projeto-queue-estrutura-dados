import { Queue, Password,PasswordType,ServiceType } from "./queue";


var filaNormal: Queue = new Queue()
var filaPreferencial: Queue = new Queue()
var senhasPossiveisNormal: PasswordType = {
    agendamento: ["AN001"],
    consulta: [],
    exame: []   
}

var senhasPossiveisPreferencial:PasswordType = {
    agendamento: ["PA001"],
    consulta: [],
    exame: [] 
}


function pegarSenha(preferencial:boolean,tipoSenha:ServiceType){
    if(preferencial){
        let index : number = Math.floor(Math.random() * senhasPossiveisPreferencial[tipoSenha].length)
        let senha : string = senhasPossiveisPreferencial[tipoSenha][index]
        delete senhasPossiveisPreferencial[tipoSenha][index]
        filaPreferencial.add(new Password(senha))

    }else{
        let index : number = Math.floor(Math.random() * senhasPossiveisNormal[tipoSenha].length)
        let senha : string = senhasPossiveisNormal[tipoSenha][index]
        delete senhasPossiveisNormal[tipoSenha][index]
        filaNormal.add(new Password(senha))
    }
}

function chamarSenha(preferencial:boolean){
    if(preferencial){
        return filaPreferencial.remove()
    }else{
        return filaNormal.remove()
    }
}
pegarSenha(true,"agendamento")
filaPreferencial.print()