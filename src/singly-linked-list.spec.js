import { SinglyLinkedList, SinglyLinkedListErrorMessages } from "./LinkedList";

const generateRandomNumber = ({ minimum = 0, maximum = 20 } = {}) =>
  minimum + Math.ceil(Math.random() * (maximum - minimum));
const generateListOfNumbers = (amount = 1) =>
  Array.from(Array(amount).keys()).map((generatedNumber) =>
    generateRandomNumber()
  );

describe("Linked List", () => {
  let list;

  beforeEach(() => {
    list = new SinglyLinkedList();
  });
  afterEach(() => {
    list = null;
  });

  it("To Array - empty lists", () => {
    expect(list.toArray()).toEqual([]);
    expect(list.length).toEqual(0);
  });

  it("Push first item", () => {
    const randomNumber = generateRandomNumber();
    list.push(randomNumber);
    expect(list.toArray()).toEqual([randomNumber]);
    expect(list.length).toEqual(1);
  });

  it("Push second Item", () => {
    const testNumbers = generateListOfNumbers(2);
    list.fromArray(testNumbers);
    expect(list.toArray()).toEqual(testNumbers);
    expect(list.length).toEqual(2);
  });

  it("Push several itens", () => {
    const amount = generateRandomNumber();
    const testNumbers = generateListOfNumbers(amount);
    list.fromArray(testNumbers);
    expect(list.toArray()).toEqual(testNumbers);
    expect(list.length).toEqual(amount);
  });

  it("Pop from empty list", () => {
    const popedNumber = list.pop();
    expect(popedNumber).toEqual(null);
  });

  it("Pop with one element", () => {
    const testNumber = generateRandomNumber();
    list.push(testNumber);
    const extractedNumber = list.pop();
    expect(extractedNumber).toEqual(testNumber);
    expect(list.length).toEqual(0);
  });

  it("Pop from fulfilled list", () => {
    const testNumbers = generateListOfNumbers(5);
    list.fromArray(testNumbers);
    const lastNumber = testNumbers.pop();
    const popedNumber = list.pop();
    expect(list.toArray()).toEqual(testNumbers);
    expect(popedNumber).toEqual(lastNumber);
  });

  it("Load list from array", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);
    expect(list.length).toEqual(count);
    expect(list.toArray()).toEqual(testNumbers);
  });

  it("Shift from empty list", () => {
    const extractedNumber = list.shift();
    expect(extractedNumber).toBe(null);
    expect(list.length).toBe(0);
  });

  it("Shift from one element list", () => {
    const generatedNumber = generateRandomNumber();
    list.push(generatedNumber);
    const extractedNumber = list.shift();
    expect(extractedNumber).toEqual(generatedNumber);
    expect(list.length).toEqual(0);
  });

  it("Shift from some elements list", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);
    const firstNumber = testNumbers.shift();
    const extractedNumber = list.shift();
    expect(list.toArray()).toEqual(testNumbers);
    expect(list.length).toEqual(count - 1);
    expect(extractedNumber).toEqual(firstNumber);
  });

  it("Unshift into an empty list", () => {
    const testNumber = generateRandomNumber();
    list.unshift(testNumber);
    expect(list.length).toEqual(1);
    expect(list.toArray()).toEqual([testNumber]);
  });

  it("Unshift into a fulfilled list", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);

    const numberToBeUnshift = generateRandomNumber();
    testNumbers.unshift(numberToBeUnshift);

    list.unshift(numberToBeUnshift);

    expect(list.length).toEqual(count + 1);
    expect(list.toArray()).toEqual(testNumbers);
  });

  it("Clear a list", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);

    list.clear();
    expect(list.toArray()).toEqual([]);
    expect(list.length).toEqual(0);
  });

  it("Length property unprotected to read", () => {
    const randomNumber = generateRandomNumber();
    list.push(randomNumber);
    expect(list.length).toEqual(1);
  });

  it("Length property protected to write", () => {
    const randomNumber = generateRandomNumber();
    list.push(randomNumber);
    expect.assertions(1);
    try {
      list.length = randomNumber + 5;
    } catch (error) {
      expect(list.length).toBe(1);
    }
  });

  it("Get element by index from an empty list", () => {
    const randomIndex = generateRandomNumber();
    const extractedNumber = list.get(randomIndex);
    expect(extractedNumber).toBeNull();
  });

  it("Get element by index with index out of boundaries", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);

    const indexOutForBoundares = generateRandomNumber() + count;
    const extractedNumber = list.get(indexOutForBoundares);
    expect(extractedNumber).toBeNull();
  });

  it("Get element by index", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);

    const randomExistingIndex = Math.floor(Math.random() * count);
    const extractedNumber = list.get(randomExistingIndex);

    expect(extractedNumber).toEqual(list.toArray()[randomExistingIndex]);
  });

  it("Set element by index from an empty list", () => {
    const randomIndex = generateRandomNumber();
    const randomValue = generateRandomNumber();
    expect.assertions(1);
    try {
      list.set(randomIndex, randomValue);
    } catch (error) {
      expect(error.message).toBe(SinglyLinkedListErrorMessages.outOfBoundaries);
    }
  });

  it("Set element by a nonexistent index", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);

    const indexOutForBoundares = generateRandomNumber() + count;
    const randomValue = generateRandomNumber();

    expect.assertions(1);
    try {
      list.set(indexOutForBoundares, randomValue);
    } catch (error) {
      expect(error.message).toBe(SinglyLinkedListErrorMessages.outOfBoundaries);
    }
  });

  it("Set element by index", () => {
    const count = generateRandomNumber();
    const testNumbers = generateListOfNumbers(count);
    list.fromArray(testNumbers);

    const randomExistingIndex = Math.floor(Math.random() * count);
    const randomValue = generateRandomNumber();

    list.set(randomExistingIndex, randomValue);

    expect(list.toArray()[randomExistingIndex]).toEqual(randomValue);
  });

  it("Insert an element in an empty list", () => {
    const randomIndex = generateRandomNumber();
    const randomNumber = generateRandomNumber();
    expect.assertions(1);
    try {
      list.insert(randomIndex, randomNumber);
    } catch (error) {
      expect(error.message).toEqual(
        SinglyLinkedListErrorMessages.outOfBoundaries
      );
    }
  });

  it("Insert an element using a nonexistent index", () => {
    const count = generateRandomNumber();
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    const indexOutOfBoundaries = generateRandomNumber() + count;
    const randomNumber = generateRandomNumber();
    expect.assertions(1);

    try {
      list.insert(indexOutOfBoundaries, randomNumber);
    } catch (error) {
      expect(error.message).toEqual(
        SinglyLinkedListErrorMessages.outOfBoundaries
      );
    }
  });

  it("Insert an element in the top of the list", () => {
    const count = generateRandomNumber();
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    const randomNumber = generateRandomNumber();

    numbersList.unshift(randomNumber);
    list.insert(0, randomNumber);

    expect(list.length).toEqual(count + 1);
    expect(list.toArray()).toEqual(numbersList);
  });

  it("Insert an element in the bottom of the list", () => {
    const count = generateRandomNumber();
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    const randomNumber = generateRandomNumber();

    numbersList.push(randomNumber);
    list.insert(count - 1, randomNumber);

    expect(list.length).toEqual(count + 1);
    expect(list.toArray()).toEqual(numbersList);
  });

  it("Insert an element in the middle of the list", () => {
    const count = generateRandomNumber({ minimum: 3 });
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    const randomNumber = generateRandomNumber();

    const randomValidIndex = generateRandomNumber({
      minimum: 1,
      maximum: count - 2,
    });

    numbersList.splice(randomValidIndex, 0, randomNumber);
    list.insert(randomValidIndex, randomNumber);

    expect(list.length).toEqual(count + 1);
    expect(list.toArray()).toEqual(numbersList);
  });

  it("Remove an element from an empty list", () => {
    const randomIndex = generateRandomNumber();
    expect.assertions(1);
    try {
      list.remove(randomIndex);
    } catch (error) {
      expect(error.message).toEqual(
        SinglyLinkedListErrorMessages.outOfBoundaries
      );
    }
  });

  it("Remove an element using a nonexistent index", () => {
    const count = generateRandomNumber();
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    const indexOutOfBoundaries = generateRandomNumber() + count;
    expect.assertions(1);

    try {
      list.remove(indexOutOfBoundaries);
    } catch (error) {
      expect(error.message).toEqual(
        SinglyLinkedListErrorMessages.outOfBoundaries
      );
    }
  });

  it("Remove an element from the top of the list", () => {
    const count = generateRandomNumber();
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    numbersList.shift();
    list.remove(0);

    expect(list.length).toEqual(count - 1);
    expect(list.toArray()).toEqual(numbersList);
  });

  it("Remove an element from the bottom of the list", () => {
    const count = generateRandomNumber();
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    numbersList.pop();
    list.remove(count - 1);

    expect(list.length).toEqual(count - 1);
    expect(list.toArray()).toEqual(numbersList);
  });

  it("Remove an element from the middle of the list", () => {
    const count = generateRandomNumber({ minimum: 10 });
    const numbersList = generateListOfNumbers(count);
    list.fromArray(numbersList);

    const randomValidIndex = generateRandomNumber({
      minimum: 1,
      maximum: count - 2,
    });

    numbersList.splice(randomValidIndex, 1);
    list.remove(randomValidIndex);

    expect(list.length).toEqual(count - 1);
    expect(list.toArray()).toEqual(numbersList);
  });
});
