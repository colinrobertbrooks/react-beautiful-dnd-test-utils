import { render, screen, within } from "@testing-library/react";
import {
  DND_DIRECTION_DOWN,
  DND_DIRECTION_UP,
  DND_DRAGGABLE_DATA_ATTR,
  makeDnd,
  mockDndSpacing,
  mockGetComputedStyle,
} from "react-beautiful-dnd-test-utils";
import App from "./App";
import initialData from "./initial-data";

const verifyTaskOrderInColumn = (
  columnTestId: string,
  orderedTasks: string[]
): void => {
  const texts = within(screen.getByTestId(columnTestId))
    .getAllByTestId("task")
    .map((x) => x.textContent);
  expect(texts).toEqual(orderedTasks);
};

const renderApp = (): void => {
  const { container } = render(<App initialState={initialData} />);
  mockDndSpacing(container);
};

describe("App", () => {
  beforeEach(() => {
    mockGetComputedStyle();
  });

  describe("dnd", () => {
    test("moves a task up inside a column", async () => {
      renderApp();

      await makeDnd({
        text: "Cook dinner",
        direction: DND_DIRECTION_UP,
        positions: 1,
      });

      verifyTaskOrderInColumn("to-do-column", [
        "Take out the garbage",
        "Watch my favorite show",
        "Cook dinner",
        "Charge my phone",
      ]);
    });

    test("moves a task down inside a column", async () => {
      renderApp();

      await makeDnd({
        getDragElement: () =>
          screen
            .getByText("Take out the garbage")
            .closest(DND_DRAGGABLE_DATA_ATTR),
        direction: DND_DIRECTION_DOWN,
        positions: 2,
      });

      verifyTaskOrderInColumn("to-do-column", [
        "Watch my favorite show",
        "Charge my phone",
        "Take out the garbage",
        "Cook dinner",
      ]);
    });
  });
});
