import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export type tSeries = {
  'Максимальный рейтинг': boolean;
  'Средний рейтинг': boolean;
  'Минимальный рейтинг': boolean;
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: CheckboxProps) {
  
  // чекбоксы
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  // тип диаграммы
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === 'bar');
  };

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="center"
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={4}
      sx={{ m: "30px 0", p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}
    >
      {/* Выбор графика */}
      <FormControl component="fieldset">
        <FormLabel id="label-radio-group" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
          Тип диаграммы:
        </FormLabel>
        <RadioGroup
          name="group-radio"
          value={isBar ? "bar" : "dot"}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel value="bar" control={<Radio checked={isBar} />} label="Гистограмма" />
          <FormControlLabel value="dot" control={<Radio checked={!isBar} />} label="Линейная" />
        </RadioGroup>
      </FormControl>

      {/* Выбор серий */}
      <FormControl component="fieldset">
        <FormLabel id="label-checkbox-group" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
          На диаграмме показать:
        </FormLabel>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={series["Максимальный рейтинг"]} onChange={handleCheckboxChange} name="Максимальный рейтинг" />}
            label="Максимальный"
          />
          <FormControlLabel
            control={<Checkbox checked={series["Средний рейтинг"]} onChange={handleCheckboxChange} name="Средний рейтинг" />}
            label="Средний"
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={series["Минимальный рейтинг"]} 
                onChange={handleCheckboxChange} 
                name="Минимальный рейтинг" 
              />
            }
            label="Минимальный"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}

export default SettingChart;