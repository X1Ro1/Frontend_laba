import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListItem, ListItemText, ListItemButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableItemProps {
  item: string;
}

export function SortableItem({ item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '8px',
  };

  // подвижные части 
  return (
    <ListItem ref={setNodeRef} style={style} disablePadding>
      <ListItemButton
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#f9f9f9',
          },
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '400px'
        }}
        {...attributes}
        {...listeners}
      >
        <DragIndicatorIcon sx={{ color: 'gray' }} />
        <ListItemText primary={item} />
      </ListItemButton>
    </ListItem>
  );
}