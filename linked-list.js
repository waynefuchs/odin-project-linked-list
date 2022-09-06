class Node {
  value;
  next;

  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// I implemented this class using nested objects because
// it seemed more interesting than implementing in an array.
// (The array method would be 'better')
//
// Looking through the submitted code bases, it looks like most
// implemented linked lists using nested objects. 
// I definitely felt that this method was more in spirit with 
// the assignment.
class LinkedList {
  first;
  last;
  length;

  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
    console.log("Created");
  }

  append(value) {
    const newNode = new Node(value);
    if (this.last === null) {
      this.first = this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length += 1;
    return newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (this.first === null) {
      this.first = this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    this.length += 1;
    return newNode;
  }

  size() {
    return this.length;
  }

  head() {
    return this.first;
  }

  tail() {
    return this.last;
  }

  at(index) {
    if (index >= this.length) return false;
    for (
      let node = this.first, x = 0;
      node !== null && x <= index;
      x += 1, node = node.next
    ) {
      if (x === index) return node;
    }
    return false;
  }

  pop() {
    const penultimate = this.at(this.length - 2);
    const popped = this.last;
    this.last = penultimate;
    this.last.next = null;
    this.length -= 1;
    return penultimate;
  }

  find(value) {
    for (
      let node = this.first, x = 0;
      node !== null && x < this.length;
      node = node.next, x += 1
    ) {
      if (node.value === value) return x;
    }
    return null;
  }

  contains(value) {
    for (
      let node = this.first, x = 0;
      node !== null && x < this.length;
      node = node.next, x += 1
    ) {
      if (node.value === value) return true;
    }
    return false;
  }

  toString() {
    if (this.first === null) return "null";
    let returnString = `( ${this.first.value} )`;
    for (
      let node = this.first.next, x = 1;
      node !== null && x < this.length;
      node = node.next, x += 1
    ) {
      returnString += ` -> ( ${node.value} )`;
    }
    return returnString + ` -> null`;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return this.prepend(value);
    if (index === this.length) return this.append(value);
    const newNode = new Node(value);
    const prevNode = this.at(index - 1);
    newNode.next = prevNode.next;
    prevNode.next = newNode.next;
    return newNode;
  }

  removeAt(index) {
    if(index < 0 && index >= this.length) return false;
    if(index === 0) {
        const removed = this.first;
        this.first = removed.next;
        removed.next = null;
        this.length -= 1;
        return removed;
    } else if(index === this.length) {
        return this.pop();
    }
    const removePrev = this.at(index - 1);
    const remove = removePrev.next;
    removePrev.next = remove.next;
    remove.next = null;
    this.length -= 1;
    return remove;
  }
}


// Crude test :|
// I can't wait until TOP introduces JS testing...
// I *really* should have jumped ahead...
let ll = new LinkedList();
console.log(ll.toString());
ll.append("hello");
ll.prepend("moo");
ll.insertAt("hi", 0);
ll.insertAt('i should be last', ll.size());
console.log(ll);
console.log(ll.toString());

let rem = ll.removeAt(4);
console.log(`removeAt: ${rem.value}`);

let pop = ll.pop();
console.log(`popped: ${pop.value}`);

let index = ll.find("hello");
console.log(`find 'hello': ${index} and get value ${ll.at(index).value}`);

index = ll.find("moo");
console.log(`find 'moo': ${index} and get value ${ll.at(index).value}`);

console.log(ll);
