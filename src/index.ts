import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/*
 *  window.getComputedStyle mock
 */
const noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const getComputedStyle = ({
  margin = noSpacing,
  padding = noSpacing,
  border = noSpacing,
  display = 'block'
} = {}): CSSStyleDeclaration =>
  ({
    paddingTop: `${padding.top}px`,
    paddingRight: `${padding.right}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
    marginTop: `${margin.top}px`,
    marginRight: `${margin.right}px`,
    marginBottom: `${margin.bottom}px`,
    marginLeft: `${margin.left}px`,
    borderTopWidth: `${border.top}px`,
    borderRightWidth: `${border.right}px`,
    borderBottomWidth: `${border.bottom}px`,
    borderLeftWidth: `${border.left}px`,
    display
    // there are over 400 more properties, but these are the ones we need
  } as CSSStyleDeclaration);

export const mockGetComputedStyle = (): jest.SpyInstance<CSSStyleDeclaration> =>
  jest
    .spyOn(window, 'getComputedStyle')
    .mockImplementation(() => getComputedStyle());

/*
 *  element.getBoundingClientRect mock
 */
const mockGetBoundingClientRect = (
  element: Element
): jest.SpyInstance<DOMRect> =>
  jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => undefined
  }));

/*
 *  promise util
 */
type AsyncFn = () => Promise<void>;

const executeAsyncFnsSerially = (fns: AsyncFn[]): Promise<void[]> =>
  fns.reduce(
    (promise, fn) =>
      promise.then(result => fn().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  );

/*
 *  react-beautiful-dnd utils
 */
const DND_DROPPABLE_DATA_ATTR = '[data-rbd-droppable-id]';
const DND_DRAGGABLE_DATA_ATTR = '[data-rbd-draggable-id]';

export const mockDndSpacing = (container: HTMLElement): void => {
  const droppables = container.querySelectorAll(DND_DROPPABLE_DATA_ATTR);
  droppables.forEach(droppable => {
    mockGetBoundingClientRect(droppable);
    const draggables = droppable.querySelectorAll(DND_DRAGGABLE_DATA_ATTR);
    draggables.forEach(draggable => mockGetBoundingClientRect(draggable));
  });
};

export const DND_DIRECTION_UP = 'UP';
export const DND_DIRECTION_DOWN = 'DOWN';

export const makeDnd = async ({
  text,
  direction,
  positions
}: {
  text: string;
  direction: 'UP' | 'DOWN';
  positions: number;
}): Promise<void> => {
  // https://testing-library.com/docs/ecosystem-user-event/#special-characters
  const spaceKey = '{space}';
  const arrowUpKey = '{arrowup}';
  const arrowDownKey = '{arrowdown}';
  const getKeyForDirection = () => {
    switch (direction) {
      case DND_DIRECTION_UP:
        return arrowUpKey;
      case DND_DIRECTION_DOWN:
        return arrowDownKey;
      default:
        throw new Error('Unhandled `direction`!');
    }
  };
  const handleMovementInDirection = async () => {
    // enable keyboard dragging
    userEvent.keyboard(spaceKey);
    expect(
      await screen.findByText(/You have lifted an item/i)
    ).toBeInTheDocument();
    // move draggable based on direction
    userEvent.keyboard(getKeyForDirection());
    expect(
      await screen.findByText(/You have moved the item/i)
    ).toBeInTheDocument();
    // disable keyboard dragging
    userEvent.keyboard(spaceKey);
    expect(
      await screen.findByText(/You have dropped the item/i)
    ).toBeInTheDocument();
  };

  // focus draggable
  const draggable = screen.getByText(text).closest(DND_DRAGGABLE_DATA_ATTR);
  (draggable as HTMLElement).focus();
  expect(draggable).toHaveFocus();

  // move draggable based on direction and positions
  const movements = [];
  for (let i = 0; i < positions; i += 1) {
    movements.push(handleMovementInDirection);
  }
  await executeAsyncFnsSerially(movements);
};
