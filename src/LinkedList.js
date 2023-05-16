export class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}

export class SinglyLinkedListErrorMessages {
  static outOfBoundaries = "Index out of boundaries";
}

export class SinglyLinkedList {
  #length = 0;

  constructor() {
    this.head = null;
    this.tail = null;
    this.#length = 0;
  }

  get length() {
    return this.#length;
  }

  clear() {
    this.#length = 0;
    this.head = null;
    this.tail = null;
  }

  toArray() {
    const list = [];

    if (this.head) {
      list.push(this.head.data);
      let current = this.head;
      while (current.next) {
        current = current.next;
        list.push(current.data);
      }
    }

    return list;
  }

  fromArray(valueList) {
    this.clear();
    valueList.forEach((item) => this.push(item));
    return this.#length;
  }

  push(value) {
    const newNode = new Node(value);
    this.#length++;

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      this.tail = newNode;
    }

    return value;
  }

  pop() {
    if (!this.head) return null;

    if (this.#length == 1) {
      const returnedValue = this.head.data;
      this.head = null;
      this.tail = null;
      this.#length = 0;
      return returnedValue;
    }

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    newTail.next = null;
    this.tail = newTail;
    this.#length--;
    return current.data;
  }

  shift() {
    if (!this.head) return null;

    if (this.#length == 1) return this.pop();

    const value = this.head.data;
    this.head = this.head.next;
    this.#length--;
    return value;
  }

  unshift(value) {
    if (!this.head) return this.push(value);

    const newNode = new Node(value);

    newNode.next = this.head;
    this.head = newNode;
    this.#length++;

    return value;
  }

  #retrieveTargetAndPriorNodes(targetIndex) {
    const response = {
      current: null,
      prior: null,
    };

    if (this.length == 0) return response;

    if (targetIndex >= this.length || targetIndex < 0) return response;

    let index = 0;
    response.current = this.head;

    while (index < targetIndex) {
      response.prior = response.current;
      response.current = response.current.next;
      index++;
    }

    return response;
  }

  get(index) {
    return this.#retrieveTargetAndPriorNodes(index).current?.data || null;
  }

  set(index, value) {
    const elementToBeUpdated = this.#retrieveTargetAndPriorNodes(index).current;
    if (!elementToBeUpdated) {
      throw new Error(SinglyLinkedListErrorMessages.outOfBoundaries);
      return;
    }
    elementToBeUpdated.data = value;
  }

  insert(index, value) {
    if (this.length == 0 || index < 0 || index > this.length - 1) {
      throw new Error(SinglyLinkedListErrorMessages.outOfBoundaries);
    }

    if (index == 0) return this.unshift(value);

    if (index == this.length - 1) return this.push(value);

    const { current, prior } = this.#retrieveTargetAndPriorNodes(index);

    const newNode = new Node(value);

    prior.next = newNode;
    newNode.next = current;
    this.#length++;
  }

  remove(index) {
    if (this.length == 0 || index < 0 || index > this.length - 1) {
      throw new Error(SinglyLinkedListErrorMessages.outOfBoundaries);
    }

    if (index == 0) return this.shift();

    if (index == this.length - 1) return this.pop();

    const { current, prior } = this.#retrieveTargetAndPriorNodes(index);

    prior.next = current.next;
    this.#length--;
  }
}
