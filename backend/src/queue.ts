type ServiceType = "agendamento"|"consulta"|"exame"

interface PasswordType {
    agendamento: string[],
    consulta: string[],
    exame: string[] 
}

class Password{
    code:string
    next:Password
    constructor(v:string){
        this.code = v
        this.next = {} as Password
    }
}

class Queue{
    length:number
    head:Password
    tail:Password
    
    constructor(){
        this.length= 0
        this.head = {} as Password
        this.tail = {} as Password
    }
    
    isEmpty():boolean{
        return (this.length == 0);
    }

    add(node:Password){
        if( ! this.isEmpty()){
            this.tail.next = node;
        } else {
            this.head = node;                     
        }   
        this.tail = node;
        ++ this.length;
    }

    remove():Password{
        let removed_node = {} as Password;
        if (! this.isEmpty()){
            removed_node = this.head;
            this.head = this.head.next;
            -- this.length;           
        }
        return removed_node;
    }     

    toArray(): string[] {
        let current_node = this.head;
        let items : string[] = []
        while(Object.keys(current_node).length != 0){ //Object is not empty
            items.push(current_node.code)
            current_node = current_node.next;
        }
        console.log(items)
        return items
    }

    getHead():Password{
        return this.head
    }


}

export {
    Password,Queue,PasswordType,ServiceType
}