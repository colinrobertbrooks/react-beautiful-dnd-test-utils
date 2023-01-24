import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

const reorder = (
  array: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const InnerList = ({
  column,
  taskMap,
  index,
}: {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  taskMap: {
    [key: string]: {
      id: string;
      content: string;
    };
  };
  index: number;
}) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} />;
};

const App = ({
  initialState,
}: {
  initialState: {
    tasks: {
      [key: string]: {
        id: string;
        content: string;
      };
    };
    columns: {
      [key: string]: {
        id: string;
        title: string;
        taskIds: string[];
      };
    };
    columnOrder: string[];
  };
}) => {
  const [state, setState] = useState(initialState);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "COLUMN") {
      setState({
        ...state,
        columnOrder: reorder(
          state.columnOrder,
          source.index,
          destination.index
        ),
      });
      return;
    }

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newColumn = {
        ...home,
        taskIds: reorder(home.taskIds, source.index, destination.index),
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  index={index}
                  taskMap={state.tasks}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
