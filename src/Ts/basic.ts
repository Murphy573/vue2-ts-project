const duckFunc: V2TS.DuckFunction = () => {
  console.log(1);
};
duckFunc.a = () => {
  console.log(1);
};
duckFunc.b = "b";

class Person {
  protected g() {
    console.log(1);
  }
}

export class Student extends Person {
  private gg() {
    this.g();
  }
}

// const s = new Student();

debugger;

export const print: V2TS.Print = (arg) => {
  console.log(arg);
  return arg;
};
