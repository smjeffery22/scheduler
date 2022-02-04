import React from "react";
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";
require('dotenv').config();

// beforeEach(() => {
//   jest.resetModules()
//   process.env = { ...OLD_ENV };
//   delete process.env.NODE_ENV;
// });

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
