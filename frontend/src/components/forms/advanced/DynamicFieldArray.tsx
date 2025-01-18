import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Button,
  styled,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

interface DynamicFieldArrayProps {
  fields: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  renderField: (index: number) => React.ReactNode;
  title?: string;
  addLabel?: string;
  maxFields?: number;
  minFields?: number;
}

const ArrayContainer = styled(Box)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '24px',
  marginBottom: '16px',
}));

const ArrayTitle = styled(Typography)(() => ({
  color: '#FFFFFF',
  fontFamily: 'serif',
  letterSpacing: '0.05em',
  marginBottom: '16px',
  fontWeight: 500,
}));

const FieldContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  padding: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'border-color 0.2s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const DragHandle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.5)',
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
}));

const FieldContent = styled(Box)(() => ({
  flex: 1,
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
  color: '#FFFFFF',
  padding: '8px 24px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
  '&:disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
  },
  '&:disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

export const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({
  fields,
  onAdd,
  onRemove,
  onReorder,
  renderField,
  title,
  addLabel = 'Add Field',
  maxFields = Infinity,
  minFields = 0,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <ArrayContainer>
      {title && <ArrayTitle variant="h6">{title}</ArrayTitle>}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="field-array">
          {(provided: DroppableProvided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {fields.map((_, index) => (
                <Draggable
                  key={`field-${index}`}
                  draggableId={`field-${index}`}
                  index={index}
                >
                  {(provided: DraggableProvided) => (
                    <FieldContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <DragHandle {...provided.dragHandleProps}>
                        <DragIcon />
                      </DragHandle>
                      <FieldContent>
                        {renderField(index)}
                      </FieldContent>
                      <StyledIconButton
                        onClick={() => onRemove(index)}
                        disabled={fields.length <= minFields}
                        size="small"
                      >
                        <RemoveIcon />
                      </StyledIconButton>
                    </FieldContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      <Box sx={{ mt: 2 }}>
        <StyledButton
          startIcon={<AddIcon />}
          onClick={onAdd}
          disabled={fields.length >= maxFields}
          fullWidth
        >
          {addLabel}
        </StyledButton>
      </Box>
    </ArrayContainer>
  );
};

export default DynamicFieldArray; 