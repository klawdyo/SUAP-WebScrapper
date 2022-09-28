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
  //
  coverageDirectory: "./.coverage/",
  collectCoverage: true,
  coverageProvider: "v8",
};
