class Node{
    constructor(data,next=null){
        this.data = data;
        this.next=next;
    }
}

export default class LinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }



     insertFirst(data){
        this.head = new Node(data,this.head);
        this.size++;
    }

    display(){
        let current = this.head;
        console.log(current.head)
        while(current){
            current = current.next;
        }
    }

    listdata(){
        return this.head;
    }

    deleteNode(){
        var current = this.head;
        this.head = current.next;
        return this.head;
    }

}





// const ll =new LinkedList();
// ll.insertFirst(10);

// ll.insertFirst(29);

// console.log(ll);


// ll.deleteNode();

// ll.display();
// //print nod



