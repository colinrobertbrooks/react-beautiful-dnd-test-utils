import React from 'react';
import { render, screen, within } from '@testing-library/react';
import {
  mockGetComputedStyle,
  mockDndSpacing,
  makeDnd,
  DND_DIRECTION_UP,
  DND_DIRECTION_DOWN
} from 'react-beautiful-dnd-test-utils';
import App from './App';
import initialData from './initial-data';

const verifyTaskOrderInColumn = (
  columnTestId: string,
  orderedTasks: string[]
): void => {
  const texts = within(screen.getByTestId(columnTestId))
    .getAllByTestId('task')
    .map(x => x.textContent);
  expect(texts).toEqual(orderedTasks);
};

const makeGetDragElement = (text: string) => (): Element | null =>
  screen
    .getByText(text)
    .parentNode?.querySelector('[data-rbd-drag-handle-draggable-id]') || null;

const renderApp = (): void => {
  const { container } = render(<App initialState={initialData} />);
  mockDndSpacing(container);
};

describe('App', () => {
  beforeEach(() => {
    mockGetComputedStyle();
  });

  describe('dnd', () => {
    test('moves a task up inside a column', async () => {
      renderApp();

      await makeDnd({
        getDragElement: makeGetDragElement('Cook dinner'),
        direction: DND_DIRECTION_UP,
        positions: 1
      });

      verifyTaskOrderInColumn('to-do-column', [
        'Take out the garbage',
        'Watch my favorite show',
        'Cook dinner',
        'Charge my phone'
      ]);
    });

    test('moves a task down inside a column', async () => {
      renderApp();

      await makeDnd({
        getDragElement: makeGetDragElement('Take out the garbage'),
        direction: DND_DIRECTION_DOWN,
        positions: 2
      });

      verifyTaskOrderInColumn('to-do-column', [
        'Watch my favorite show',
        'Charge my phone',
        'Take out the garbage',
        'Cook dinner'
      ]);
    });
  });
});
