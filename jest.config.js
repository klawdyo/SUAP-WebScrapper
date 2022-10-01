module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/src/.*\\.(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: "node",
  maxWorkers: 1,
  // Arquivo de Setup para os testes, onde carrega o que for importante,
  // como o .env usado neles
  setupFiles: ["<rootDir>/tests/setup_tests.ts"],
  //
  coverageDirectory: "./tests/coverage/",
  // collectCoverage: true,
  coverageProvider: "v8",
};
