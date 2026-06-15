import { Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../features/quizSlice';
import SortableList from './SortableList';
import { tTasks } from "../quizData";

interface ComponentProps {
  index: number;
  tasks: tTasks;
}

function Matching({ index, tasks }: ComponentProps) {
  const dispatch = useDispatch();
  
  const answers = useMemo(() => 
    [...tasks.map(item => item.answer)].sort(() => Math.random() - 0.5), 
  [tasks]);

  useEffect(() => {
    dispatch(addList({ index, items: answers }));
  }, [dispatch, index, answers]);


  // неподвижные части
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={6}>
        <List disablePadding>
          {tasks.map((item, idx) => (
            <ListItem key={idx} sx={{ mb: '8px' }} disablePadding>
              <ListItemButton 
                disabled 
                sx={{ 
                  border: '1px solid gray', 
                  borderRadius: '8px', 
                  backgroundColor: '#f5f5f5',
                  "&.Mui-disabled": { opacity: 1, color: '#000' },
                  width: '300px',
                  height: '50px'
                }}
              >
                <ListItemText primary={item.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <SortableList index={index} answers={answers} />
      </Grid>
    </Grid>
  );
}

export default Matching;