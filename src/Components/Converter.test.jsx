/** @format */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Converter from "./Converter";

describe("something tobe truthy", () => {
  it("truth to be truth", () => {
    expect(true).toBe(true);
  });
});
describe("Converter", () => {
  it("renders all properties", () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<Converter />);
    screen.debug();
  });

  it("renders a clickable button", () => {
    render(<button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders <label> and <input> to be in the Converter", () => {
    render(
      <div>
        <label htmlFor="Select Currency">Select Currency</label>
        <input id="Input" />
      </div>
    );
  });
});
