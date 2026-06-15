import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, Box } from '@mui/material';
import { setChoiceAnswer } from '../features/quizSlice';
import { RootState } from '../../store';

interface ChoiceQuestionsProps {
  index: number;
  type: 'O' | 'W';
  options: { id: number; text: string; answer: string }[];
}

function ChoiceQuestions({ index, type, options }: ChoiceQuestionsProps) {
  const dispatch = useDispatch();
  const selectedAnswerIds = useSelector((state: RootState) => state.lists.choiceAnswers[index]) || [];

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    dispatch(setChoiceAnswer({ index, answers: [selectedId] }));
  };

  const handleCheckboxChange = (optionId: number, checked: boolean) => {
    let newSelectedIds: number[];
    if (checked) {
      newSelectedIds = [...selectedAnswerIds, optionId];
    } else {
      newSelectedIds = selectedAnswerIds.filter((id) => id !== optionId);
    }
    dispatch(setChoiceAnswer({ index, answers: newSelectedIds }));
  };

  return (
    <Box sx={{ width: '100%', mt: 2, pl: 2 }}>
      {type === 'O' ? (
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedAnswerIds[0]?.toString() || ''}
            onChange={handleRadioChange}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id.toString()}
                control={<Radio sx={{ color: 'gray', '&.Mui-checked': { color: 'rgb(2, 132, 2)' } }} />}
                label={option.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ) : (
        <FormControl component="fieldset">
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={selectedAnswerIds.includes(option.id)}
                    onChange={(e) => handleCheckboxChange(option.id, e.target.checked)}
                    sx={{ color: 'gray', '&.Mui-checked': { color: 'rgb(2, 132, 2)' } }}
                  />
                }
                label={option.text}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default ChoiceQuestions;