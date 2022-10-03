module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^data/(.*)$": "<rootDir>/src/data/$1",
    "^models/(.*)$": "<rootDir>/src/data/models/$1",
    "^modules/(.*)$": "<rootDir>/src/modules/$1",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
    "^/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/(tests|src)/.*\\.(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: "node",
  maxWorkers: 1,
  // Arquivo de Setup para os testes, onde carrega o que for importante,
  // como o .env usado neles
  setupFiles: ["<rootDir>/tests/setup_tests.ts"],
  //
  coverageDirectory: "./tests/coverage/",
  // collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**", // tudo dentro de src
    // "!src/database/migrations/**", // exceto migration
  ],

  coverageProvider: "v8",
};
