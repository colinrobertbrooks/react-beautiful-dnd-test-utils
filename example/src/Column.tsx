import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDragging }: { isDragging: boolean }) =>
    isDragging ? "lightgreen" : "white"};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDragging }: { isDragging: boolean }) =>
    isDragging ? "lightgreen" : "white"};
  &:hover {
    background-color: lightgrey;
  }
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }: { isDraggingOver: boolean }) =>
    isDraggingOver ? "skyblue" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

const InnerList = ({
  tasks,
}: {
  tasks: {
    id: string;
    content: string;
  }[];
}) => (
  <>
    {tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
  </>
);

const Column = ({
  column,
  index,
  tasks,
}: {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  index: number;
  tasks: {
    id: string;
    content: string;
  }[];
}) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided, snapshot) => (
      <Container
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.draggableProps}
        data-testid={`${column.title.toLowerCase().replace(/\s/g, "-")}-column`}
      >
        <Title {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
          {column.title}
        </Title>
        <Droppable droppableId={column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList tasks={tasks} />
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )}
  </Draggable>
);

export default Column;
