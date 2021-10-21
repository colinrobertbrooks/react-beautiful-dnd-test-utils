import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  waitFor,
  RenderResult,
  Matcher,
  SelectorMatcherOptions
} from '@testing-library/react';

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
 *  el.getBoundingClientRect mock
 */
const mockGetBoundingClientRect = (el: Element): jest.SpyInstance<DOMRect> =>
  jest.spyOn(el, 'getBoundingClientRect').mockImplementation(() => ({
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
// used for lookups
const DND_DROPPABLE_DATA_ATTR = '[data-rbd-droppable-id]';
export const DND_DRAGGABLE_DATA_ATTR = '[data-rbd-draggable-id]';

export const mockDndElSpacing = (rtlUtils: RenderResult): void => {
  const droppables = rtlUtils.container.querySelectorAll(
    DND_DROPPABLE_DATA_ATTR
  );
  droppables.forEach(dropEl => {
    mockGetBoundingClientRect(dropEl);
    const draggables = dropEl.querySelectorAll(DND_DRAGGABLE_DATA_ATTR);
    draggables.forEach(dragEl => {
      mockGetBoundingClientRect(dragEl);
    });
  });
};

export const DND_DIRECTION_LEFT = 'DND_DIRECTION_LEFT';
export const DND_DIRECTION_UP = 'DND_DIRECTION_UP';
export const DND_DIRECTION_RIGHT = 'DND_DIRECTION_RIGHT';
export const DND_DIRECTION_DOWN = 'DND_DIRECTION_DOWN';

export const makeDnd = async ({
  getByText,
  getDragEl,
  direction,
  positions
}: {
  getByText: (id: Matcher, options?: SelectorMatcherOptions) => HTMLElement;
  getDragEl: () => Element | null;
  direction:
    | 'DND_DIRECTION_LEFT'
    | 'DND_DIRECTION_UP'
    | 'DND_DIRECTION_RIGHT'
    | 'DND_DIRECTION_DOWN';
  positions: number;
}): Promise<void> => {
  const spaceKey = { keyCode: 32 };
  const arrowLeftKey = { keyCode: 37 };
  const arrowUpKey = { keyCode: 38 };
  const arrowRightKey = { keyCode: 39 };
  const arrowDownKey = { keyCode: 40 };
  const getKeyForDirection = () => {
    switch (direction) {
      case DND_DIRECTION_LEFT:
        return arrowLeftKey;
      case DND_DIRECTION_UP:
        return arrowUpKey;
      case DND_DIRECTION_RIGHT:
        return arrowRightKey;
      case DND_DIRECTION_DOWN:
        return arrowDownKey;
      default:
        throw new Error('Unhandled `direction`!');
    }
  };
  const handleMovementInDirection = async () => {
    // enable keyboard dragging
    fireEvent.keyDown(getDragEl(), spaceKey);
    await waitFor(() => getByText(/You have lifted an item/i));
    // move drag element based on direction
    fireEvent.keyDown(getDragEl(), getKeyForDirection());
    await waitFor(() => getByText(/You have moved the item/i));
    // disable keyboard dragging
    fireEvent.keyDown(getDragEl(), spaceKey);
    await waitFor(() => getByText(/You have dropped the item/i));
  };

  // focus drag element
  (getDragEl() as HTMLElement).focus();
  expect(getDragEl()).toHaveFocus();

  // move drag element based on direction and positions
  const movements = [];
  for (let i = 0; i < positions; i += 1) {
    movements.push(handleMovementInDirection);
  }
  await executeAsyncFnsSerially(movements);
};