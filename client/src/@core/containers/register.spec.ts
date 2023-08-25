import { RegisterContainer } from "./register"

class Sum {
  exec() {
    return 1 + 1;
  }
}

class Sub {
  exec() {
    return 1 - 1;
  }
}

class Basics {
  constructor(private readonly sum: Sum, private readonly sub: Sub) {}

  subOp() {
    return this.sub.exec();
  }

  sumOp() {
    return this.sum.exec();
  }
}

class Calculator {
  constructor(private readonly basics: Basics) {}

  basicsOp() {
    return this.basics;
  }
}

describe("Register test", () => {
  const register = {
    basics: "basics commands",
    calc: "calculator"
  };
  let registerContainer: RegisterContainer;

  beforeEach(() => {
    registerContainer = new RegisterContainer({
      [register.basics]: {
        dependencies: {
          general: [Sum, Sub],
        },
        instance: Basics
      },
      [register.calc]: {
        dependencies: {
          imports: [register.basics]
        },
        instance: Calculator
      }  
    });
  })

  it("should create a register", () => {
    const getCalc = registerContainer.start(Calculator, register.calc);
    expect(getCalc.basicsOp().sumOp()).toEqual(2);
    expect(getCalc.basicsOp().subOp()).toEqual(0);
  })

  it("should create a register", () => {
    registerContainer.start(Calculator, register.calc);
    expect(() => registerContainer.start(Calculator, register.calc)).toThrow();
  })
})
