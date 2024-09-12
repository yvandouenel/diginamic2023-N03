class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get name() {
    console.log(`dans le getter de name`);
    return this.#name;
  }
  set name(new_name) {
    console.log(`dans le setter de name`);
    this.#name = new_name;
  }
}
const b = new Person("Bob");
console.log(b.name);
b.name = "toto";
console.log(b.name);