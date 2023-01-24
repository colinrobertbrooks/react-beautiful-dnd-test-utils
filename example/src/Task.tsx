import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging }: { isDragging: boolean }) =>
    isDragging ? "lightgreen" : "white"};
`;

const Task = ({
  task,
  index,
}: {
  task: {
    id: string;
    content: string;
  };
  index: number;
}) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <div data-testid="task">{task.content}</div>
      </Container>
    )}
  </Draggable>
);

export default Task;
