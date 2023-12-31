import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.e2e-spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  clearMocks: true,
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "coverage",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};

export default config;
