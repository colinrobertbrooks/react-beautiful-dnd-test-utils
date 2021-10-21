import React from 'react';
import { render, screen, within } from '@testing-library/react';
import {
  mockGetComputedStyle,
  mockDndElSpacing,
  makeDnd,
  DND_DRAGGABLE_DATA_ATTR,
  DND_DIRECTION_DOWN,
  DND_DIRECTION_UP
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

const renderApp = () => {
  const { container, ...restUtils } = render(
    <App initialState={initialData} />
  );

  mockDndElSpacing(container);

  const makeGetDragEl = (text: string) => (): HTMLElement | null =>
    restUtils.getByText(text).closest(DND_DRAGGABLE_DATA_ATTR);

  return { makeGetDragEl, ...restUtils };
};

describe('App', () => {
  beforeEach(() => {
    mockGetComputedStyle();
  });

  describe('dnd', () => {
    test('moves a task down inside a column', async () => {
      const { makeGetDragEl } = renderApp();

      await makeDnd({
        getDragEl: makeGetDragEl('Take out the garbage'),
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

    test('moves a task up inside a column', async () => {
      const { makeGetDragEl } = renderApp();

      await makeDnd({
        getDragEl: makeGetDragEl('Cook dinner'),
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
  });
});
