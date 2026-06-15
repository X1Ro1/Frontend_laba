import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../features/quizSlice';
import SortableList from './SortableList';
import { tTasks } from "../quizData";
import { Box } from '@mui/material';

interface ComponentProps {
  index: number;
  tasks: tTasks;
}

function Sorting({ index, tasks }: ComponentProps) {
  const dispatch = useDispatch();

  const shuffledItems = useMemo(() => 
    [...tasks.map(item => item.question)].sort(() => Math.random() - 0.5), 
  [tasks]);

  useEffect(() => {
    dispatch(addList({ index, items: shuffledItems }));
  }, [dispatch, index, shuffledItems]);

  return (
    <Box sx={{ mt: 1 }}>
      <SortableList index={index} answers={shuffledItems} />
    </Box>
  );
}

export default Sorting;