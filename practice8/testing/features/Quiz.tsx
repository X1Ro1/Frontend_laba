import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { quiz } from "../quizData";
import Matching from "../components/Matching";
import Sorting from "../components/Sorting"; 
import ChoiceQuestions from "../components/ChoiceQuestions";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setResult, resetQuiz } from './quizSlice';

function Quiz() {
  const dispatch = useDispatch();
  const userLists = useSelector((state: RootState) => state.lists.lists);
  const choiceAnswers = useSelector((state: RootState) => state.lists.choiceAnswers);
  const results = useSelector((state: RootState) => state.lists.results);

  const handleCheck = () => {
    quiz.forEach((item, index) => {
      let count = 0;

      if (item.type === 'M') {
        const userAnswers = userLists[index] || [];
        item.tasks.forEach((task, idx) => { 
          if (userAnswers[idx] === task.answer) count++; 
        });
      } else if (item.type === 'S') {
        const userAnswers = userLists[index] || [];
        item.tasks.forEach((task, idx) => { 
          if (userAnswers[idx] === task.question) count++; 
        });
      } else if (item.type === 'O') {
        const selectedId = choiceAnswers[index]?.[0];
        if (selectedId !== undefined && item.options) {
          const selectedOption = item.options.find(opt => opt.id === selectedId);
          if (selectedOption?.answer === "1") {
            count = 1;
          }
        }
      } else if (item.type === 'W') {
        const selectedIds = choiceAnswers[index] || [];
        if (item.options) {
          const correctIds = item.options.filter(opt => opt.answer === "1").map(opt => opt.id);
          const hasAllCorrect = correctIds.every(id => selectedIds.includes(id));
          const hasNoExtra = selectedIds.every(id => correctIds.includes(id));
          
          if (hasAllCorrect && hasNoExtra && selectedIds.length === correctIds.length) {
            count = 1;
          }
        }
      }

      dispatch(setResult({ index, count }));
    });
  };

  const handleReset = () => {
    dispatch(resetQuiz());
    window.location.reload(); 
  };

  const totalScore = results.reduce((sum, current) => sum + (current || 0), 0);
  
  const maxScore = quiz.reduce((sum, item) => {
    if (item.type === 'M' || item.type === 'S') {
      return sum + item.tasks.length;
    }
    return sum + 1;
  }, 0);

  return (
    <Container maxWidth="xl">
      {quiz.map((item, index) => (
        <Paper key={item.id} sx={{ m: 2, p: 3, borderRadius: '12px' }}>
          <Typography variant="h6" sx={{ fontWeight: '300' }}>
            {index + 1}. {item.title}
          </Typography>
          
          {item.type === 'S' && (
            <Sorting index={index} tasks={item.tasks} />
          )}
          {item.type === 'M' && (
            <Matching index={index} tasks={item.tasks} />
          )}
          {(item.type === 'O' || item.type === 'W') && item.options && (
            <ChoiceQuestions index={index} type={item.type} options={item.options} />
          )}
        </Paper>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, my: 4 }}>
        <Button 
          variant="contained" 
          onClick={handleCheck}
          sx={{ backgroundColor: 'rgb(2, 132, 2)', '&:hover': { backgroundColor: 'rgb(1, 94, 1)' } }}
        >
          Проверить
        </Button>
        <Button 
          variant="contained" 
          onClick={handleReset}
          sx={{ backgroundColor: 'rgb(48, 47, 47)', '&:hover': { backgroundColor: '#000' } }}
        >
          Начать снова
        </Button>
      </Box>

      {results.length > 0 && (
        <Paper sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '400', color: 'rgb(48, 47, 47)' }}>
            Результаты теста
          </Typography>
          <Typography variant="h6">
            Вы набрали {totalScore} из {maxScore} баллов!
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default Quiz;