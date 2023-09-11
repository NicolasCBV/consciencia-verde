import nextJest from "next/jest";
import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
  dir: "./"
});

const config: Config = {
  moduleFileExtensions: ["js", "json", "tsx", "ts"],
  testRegex: ".*\\.spec\\.(ts|js)x$",
  transform: {
    "^.+\\.(ts|js)x$": "ts-jest",
  },
  clearMocks: true,
  collectCoverageFrom: ["**/*.(ts|js)x"],
  coverageDirectory: "coverage",

  setupFiles: ["./tests/setup/reflect-metadata.ts"],
  setupFilesAfterEnv: ["./tests/setup/react.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};

export default createJestConfig(config);
