import { Config } from "jest";
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ["ts", "json", "js"],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
	"^.+\\.(t|j)s$": "ts-jest",
  },
  clearMocks: true,
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  setupFiles: ["./tests/setup/reflect-metadata.ts"],
  moduleNameMapper: pathsToModuleNameMapper(
	compilerOptions.paths, {
	  prefix: "<rootDir>/"
	}
  )
}

export default config;
