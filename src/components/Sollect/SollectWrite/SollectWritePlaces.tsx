import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { useSollectWriteStore } from '../../../store/sollectWriteStore';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableStyle,
} from '@hello-pangea/dnd';
import SollectWriteAddedPlace from './SollectWriteAddedPlace';
import { RelatedSearchPlace } from '../../../types';

const PlaceAddButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className='w-full h-48 flex-shrink-0 rounded-lg bg-primary-700 flex justify-center items-center text-primary-50 text-sm font-normal leading-tight'
      onClick={() => {
        navigate('/sollect/write/search');
      }}>
      장소 추가
    </div>
  );
};

const SollectWritePlacese = () => {
  const { places, removePlace } = useSollectWriteStore(
    useShallow((state) => ({ places: state.places, removePlace: state.removePlace })),
  );

  const handleRemove = (placeId: number | null) => {
    if(placeId === null) return;
    removePlace(placeId);
  }

  const reorder = (
    list: RelatedSearchPlace[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      places,
      result.source.index,
      result.destination.index
    );

    useSollectWriteStore.setState({ places: items });
  };

  const getItemStyle = (
    draggableStyle: DraggableStyle | undefined
  ): React.CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none' as React.CSSProperties['userSelect'],
    margin: `0 0 12px 0`,

    ...draggableStyle,
  });

  return (
    <div className='flex-1 flex flex-col px-16 pb-12 overflow-y-auto'>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}>
        <Droppable droppableId='places'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {places.map((place, index) => (
                <Draggable
                  key={place.id}
                  draggableId={place.id?.toString() || ''}
                  index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}>
                      {/* Render the place component */}
                      <SollectWriteAddedPlace
                        key={place.id}
                        place={place}
                        handleRemove={handleRemove}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className='pt-12'></div>
      <PlaceAddButton />
    </div>
  );
};

export default SollectWritePlacese;
