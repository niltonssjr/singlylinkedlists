import { SinglyLinkedList, SinglyLinkedListErrorMessages } from "./LinkedList";

class TestElements {
  numbersList = [];
  singleNumber;
  targetIndex;

  constructor() {}

  clear() {
    this.numbersList = [];
    this.singleNumber = undefined;
  }

  get listCount() {
    return this.numbersList.length;
  }

  #generateRandomNumber = ({ minimum = 0, maximum = 20 } = {}) =>
    minimum + Math.ceil(Math.random() * (maximum - minimum));

  generateNumber = ({ minimum = 0, maximum = 20 } = {}) => {
    this.singleNumber = this.#generateRandomNumber({ minimum, maximum });
    return this.singleNumber;
  };

  generateNumbersList({ minimum = 1, maximum = 20 } = {}) {
    const randomAmount = this.#generateRandomNumber({ minimum, maximum });
    this.numbersList = Array.from(Array(randomAmount).keys()).map((_) =>
      this.#generateRandomNumber()
    );
    return this.numbersList;
  }

  generateValidIndex() {
    this.targetIndex = this.#generateRandomNumber({
      maximum: this.listCount - 1,
    });
    return this.targetIndex;
  }

  generateOutOfBoundariesIndex() {
    this.targetIndex = this.#generateRandomNumber({
      minimum: this.listCount,
      maximum: this.listCount + 10,
    });
    return this.targetIndex;
  }

  generateIntermediateIndex() {
    this.targetIndex = this.#generateRandomNumber({
      minimum: 1,
      maximum: this.listCount - 2,
    });
    return this.targetIndex;
  }
}

describe("Linked List", () => {
  let list;
  let testElements;

  beforeEach(() => {
    list = new SinglyLinkedList();
    testElements = new TestElements();
  });

  afterEach(() => {
    list = null;
    testElements.clear();
  });

  describe('"toArray" method', () => {
    it("To Array - empty lists", () => {
      expect(list.toArray()).toEqual([]);
      expect(list.length).toEqual(0);
    });
  });

  describe("Push method", () => {
    it("Push first item", () => {
      list.push(testElements.generateNumber());
      expect(list.toArray()).toEqual([testElements.singleNumber]);
      expect(list.length).toEqual(1);
    });

    it("Push second Item", () => {
      testElements.generateNumbersList({ minimum: 2, maximum: 2 });
      testElements.numbersList.map((value) => list.push(value));
      expect(list.toArray()).toEqual(testElements.numbersList);
      expect(list.length).toEqual(2);
    });

    it("Push several itens", () => {
      testElements.generateNumbersList().map((value) => list.push(value));
      expect(list.toArray()).toEqual(testElements.numbersList);
      expect(list.length).toEqual(testElements.listCount);
    });
  });

  describe("Pop method", () => {
    it("Pop from empty list", () => {
      const extractedNumber = list.pop();
      expect(extractedNumber).toEqual(null);
    });

    it("Pop with one element", () => {
      list.push(testElements.generateNumber());
      const extractedNumber = list.pop();
      expect(extractedNumber).toEqual(testElements.singleNumber);
      expect(list.length).toEqual(0);
    });

    it("Pop from fulfilled list", () => {
      list.fromArray(testElements.generateNumbersList());
      const lastNumber = testElements.numbersList.pop();
      const extractedNumber = list.pop();
      expect(list.toArray()).toEqual(testElements.numbersList);
      expect(extractedNumber).toEqual(lastNumber);
    });
  });

  describe("fromArray method", () => {
    it("Load list from array", () => {
      list.fromArray(testElements.generateNumbersList());
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });
  });

  describe("Shift method", () => {
    it("Shift from empty list", () => {
      const extractedNumber = list.shift();
      expect(extractedNumber).toBe(null);
      expect(list.length).toBe(0);
    });

    it("Shift from one element list", () => {
      list.push(testElements.generateNumber());
      const extractedNumber = list.shift();
      expect(extractedNumber).toEqual(testElements.singleNumber);
      expect(list.length).toEqual(0);
    });

    it("Shift from some elements list", () => {
      list.fromArray(testElements.generateNumbersList());
      const firstNumber = testElements.numbersList.shift();
      const extractedNumber = list.shift();
      expect(list.toArray()).toEqual(testElements.numbersList);
      expect(list.length).toEqual(testElements.listCount);
      expect(extractedNumber).toEqual(firstNumber);
    });
  });

  describe("Unshift method", () => {
    it("Unshift into an empty list", () => {
      list.unshift(testElements.generateNumber());
      expect(list.length).toEqual(1);
      expect(list.toArray()).toEqual([testElements.singleNumber]);
    });

    it("Unshift into a fulfilled list", () => {
      list.fromArray(testElements.generateNumbersList());
      testElements.numbersList.unshift(testElements.generateNumber());
      list.unshift(testElements.singleNumber);
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });
  });

  describe("Clear method", () => {
    it("Clear a list", () => {
      list.fromArray(testElements.generateNumbersList());
      list.clear();
      expect(list.toArray()).toEqual([]);
      expect(list.length).toEqual(0);
    });
  });

  describe("Length property protection", () => {
    it("Length property unprotected to read", () => {
      list.push(testElements.generateNumber());
      expect(list.length).toEqual(1);
    });

    it("Length property protected to write", () => {
      list.push(testElements.generateNumber());
      expect.assertions(1);
      try {
        list.length = list.length + 1;
      } catch (error) {
        expect(list.length).toBe(1);
      }
    });
  });

  describe("Get method", () => {
    it("Get element by index from an empty list", () => {
      const extractedNumber = list.get(
        testElements.generateOutOfBoundariesIndex()
      );
      expect(extractedNumber).toBeNull();
    });

    it("Get element by index with index out of boundaries", () => {
      list.fromArray(testElements.generateNumbersList());
      const extractedNumber = list.get(
        testElements.generateOutOfBoundariesIndex()
      );
      expect(extractedNumber).toBeNull();
    });

    it("Get element by index", () => {
      list.fromArray(testElements.generateNumbersList());
      const extractedNumber = list.get(testElements.generateValidIndex());
      expect(extractedNumber).toEqual(list.toArray()[testElements.targetIndex]);
    });
  });

  describe("Set method", () => {
    it("Set element by index from an empty list", () => {
      expect.assertions(1);
      try {
        list.set(
          testElements.generateOutOfBoundariesIndex(),
          testElements.generateNumber()
        );
      } catch (error) {
        expect(error.message).toBe(
          SinglyLinkedListErrorMessages.outOfBoundaries
        );
      }
    });

    it("Set element by a nonexistent index", () => {
      list.fromArray(testElements.generateNumbersList());
      expect.assertions(1);
      try {
        list.set(
          testElements.generateOutOfBoundariesIndex(),
          testElements.generateNumber()
        );
      } catch (error) {
        expect(error.message).toBe(
          SinglyLinkedListErrorMessages.outOfBoundaries
        );
      }
    });

    it("Set element by index", () => {
      list.fromArray(testElements.generateNumbersList());
      list.set(
        testElements.generateValidIndex(),
        testElements.generateNumber()
      );
      expect(list.toArray()[testElements.targetIndex]).toEqual(
        testElements.singleNumber
      );
    });
  });

  describe("Insert method", () => {
    it("Insert an element in an empty list", () => {
      expect.assertions(1);
      try {
        list.set(
          testElements.generateOutOfBoundariesIndex(),
          testElements.generateNumber()
        );
      } catch (error) {
        expect(error.message).toEqual(
          SinglyLinkedListErrorMessages.outOfBoundaries
        );
      }
    });

    it("Insert an element using a nonexistent index", () => {
      list.fromArray(testElements.generateNumbersList());
      expect.assertions(1);
      try {
        list.set(
          testElements.generateOutOfBoundariesIndex(),
          testElements.generateNumber()
        );
      } catch (error) {
        expect(error.message).toEqual(
          SinglyLinkedListErrorMessages.outOfBoundaries
        );
      }
    });

    it("Insert an element in the top of the list", () => {
      list.fromArray(testElements.generateNumbersList());
      testElements.numbersList.unshift(testElements.generateNumber());
      list.insert(0, testElements.singleNumber);
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });

    it("Insert an element in the bottom of the list", () => {
      list.fromArray(testElements.generateNumbersList());
      testElements.numbersList.push(testElements.generateNumber());
      list.insert(list.length - 1, testElements.singleNumber);
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });

    it("Insert an element in the middle of the list", () => {
      list.fromArray(testElements.generateNumbersList({ minimum: 3 }));
      testElements.numbersList.splice(
        testElements.generateIntermediateIndex(),
        0,
        testElements.generateNumber()
      );
      list.insert(testElements.targetIndex, testElements.singleNumber);
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });
  });

  describe("Remove method", () => {
    it("Remove an element from an empty list", () => {
      expect.assertions(1);
      try {
        list.remove(testElements.generateOutOfBoundariesIndex());
      } catch (error) {
        expect(error.message).toEqual(
          SinglyLinkedListErrorMessages.outOfBoundaries
        );
      }
    });

    it("Remove an element using a nonexistent index", () => {
      list.fromArray(testElements.generateNumbersList());
      expect.assertions(1);
      try {
        list.remove(testElements.generateOutOfBoundariesIndex());
      } catch (error) {
        expect(error.message).toEqual(
          SinglyLinkedListErrorMessages.outOfBoundaries
        );
      }
    });

    it("Remove an element from the top of the list", () => {
      list.fromArray(testElements.generateNumbersList());
      testElements.numbersList.shift();
      list.remove(0);
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });

    it("Remove an element from the bottom of the list", () => {
      list.fromArray(testElements.generateNumbersList());
      testElements.numbersList.pop();
      list.remove(list.length - 1);
      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });

    it("Remove an element from the middle of the list", () => {
      list.fromArray(testElements.generateNumbersList({ minimum: 3 }));
      testElements.numbersList.splice(
        testElements.generateIntermediateIndex(),
        1
      );
      list.remove(testElements.targetIndex);

      expect(list.length).toEqual(testElements.listCount);
      expect(list.toArray()).toEqual(testElements.numbersList);
    });
  });
});
