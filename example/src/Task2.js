import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// https://github.com/thijskramer/react-beautiful-dnd-test-utils-crash

const FancyCard = ({
  content,
  forwardedRef,
  dragHandleProps,
  ...restProps
}) => (
  <div ref={forwardedRef} {...restProps}>
    <div {...dragHandleProps}>...</div>
    <div data-testid="task">{content}</div>
  </div>
);

const Card = React.forwardRef((props, ref) => (
  <FancyCard forwardedRef={ref} {...props} />
));

const Task2 = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {provided => (
      <Card
        {...provided.draggableProps}
        dragHandleProps={provided.dragHandleProps}
        ref={provided.innerRef}
        content={task.content}
      />
    )}
  </Draggable>
);

export default Task2;
