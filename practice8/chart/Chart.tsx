import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupChart from './components/GroupChart';
import SettingChart, { tSeries } from './components/SettingChart';
import { years, countries, types } from "./groupdata";

type tSelect = "Студия" | "Год" | "Тип";

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    minWidth: 60, 
    flex: 0.5, 
    align: 'left', 
    headerAlign: 'left' 
  },
  { 
    field: 'Группа', 
    headerName: 'Наименование группы', 
    minWidth: 180,
    align: 'left',
    headerAlign: 'left' 
  },
  { 
    field: 'Минимальный рейтинг', 
    headerName: 'Минимум', 
    minWidth: 120, 
    flex: 1, 
    type: 'number',
    align: 'left',
    headerAlign: 'left'
  },
  { 
    field: 'Максимальный рейтинг', 
    headerName: 'Максимум', 
    minWidth: 120, 
    flex: 1, 
    type: 'number',
    align: 'left',
    headerAlign: 'left'
  },
  { 
    field: 'Средний рейтинг', 
    headerName: 'Среднее значение', 
    minWidth: 140, 
    flex: 1, 
    type: 'number',
    align: 'left',
    headerAlign: 'left'
  },
];

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Студия");
  const [groupData, setGroupData] = React.useState(countries);
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальный рейтинг': true,
    'Средний рейтинг': true,
    'Минимальный рейтинг': true,
  });

  const [isBar, setIsBar] = React.useState<boolean>(true);
  const handleGroupChange = (event: SelectChangeEvent) => {
    const selectedGroup = event.target.value as tSelect;
    setGroup(selectedGroup);

    switch (selectedGroup) {
      case "Студия":
        setGroupData(countries);
        break;
      case "Год":
        setGroupData(years);
        break;
      case "Тип":
        setGroupData(types);
        break;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar active="3" />
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
          Группировка и анализ данных аниме
        </Typography>

        {/* Селекторы */}
        <Box sx={{ width: { xs: '100%', sm: '280px' }, m: "auto", mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="select-group-label">Группировать по</InputLabel>
            <Select
              labelId="select-group-label"
              id="select-group"
              value={group}
              label="Группировать по"
              onChange={handleGroupChange}
            >
              <MenuItem value="Студия">Студии</MenuItem>
              <MenuItem value="Год">Году выхода</MenuItem>
              <MenuItem value="Тип">Типу контента</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* График */}
        <GroupChart data={groupData} series={series} isBar={isBar} />

        {/* Панелька для графика */}
        <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
        <Box sx={{ height: 400, width: '100%', mt: 4, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Данные
          </Typography>
          <DataGrid
            rows={groupData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

export default Chart;