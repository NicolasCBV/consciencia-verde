import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.(ts|js)$",
  transform: {
    "^.+\\.(ts|js)$": "ts-jest",
  },
  clearMocks: true,
  collectCoverageFrom: ["**/*.(ts|js)"],
  coverageDirectory: "coverage",

  setupFiles: ["./tests/setup/reflect-metadata.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
export default config;
