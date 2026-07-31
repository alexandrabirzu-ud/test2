import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(url => {
    if (url === "/api/") {
      return Promise.resolve({
        json: () => Promise.resolve({ message: "Hello from MySQL test-build" })
      });
    }

    if (url.startsWith("/api/gimmick?")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            codename: "LASER PIGEON",
            mode: "stealth",
            modeLabel: "Stealth",
            badge: "BOT APPROVED",
            accent: "#22c55e",
            energy: 87,
            danceMove: "Servo Spin",
            secretPhrase: "STEALTH-12-5",
            challenge: "Submit a codename and confirm the stealth checklist is revealed.",
            checklist: [
              "Boot sequence ready for LASER PIGEON.",
              "Primary mode locked to Stealth.",
              "Assertion target: secret phrase badge is visible on screen."
            ]
          })
      });
    }

    return Promise.reject(new Error(`Unexpected fetch request: ${url}`));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders the bot drill result after submitting the form", async () => {
  render(<App />);

  expect(screen.getByText(/bot drill console/i)).toBeInTheDocument();
  expect(await screen.findByText(/hello from mysql test-build/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/bot codename/i), {
    target: { value: "laser pigeon" }
  });
  fireEvent.change(screen.getByLabelText(/drill mode/i), {
    target: { value: "stealth" }
  });
  fireEvent.click(screen.getByRole("button", { name: /run bot drill/i }));

  await waitFor(() => {
    expect(screen.getByText("LASER PIGEON")).toBeInTheDocument();
  });

  expect(screen.getByText(/bot approved/i)).toBeInTheDocument();
  expect(screen.getByText(/stealth mode/i)).toBeInTheDocument();
  expect(screen.getByText(/servo spin/i)).toBeInTheDocument();
  expect(screen.getByText(/stealth-12-5/i)).toBeInTheDocument();
});
