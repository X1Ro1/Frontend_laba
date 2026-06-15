import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tGroup } from '../groupdata';
import { tSeries } from './SettingChart';

type GroupChartProps = {
  data: tGroup;
  series: tSeries;
  isBar: boolean;
};

const seriesColors: Record<keyof tSeries, string> = {
  'Максимальный рейтинг': '#6bc5b7',
  'Средний рейтинг': '#47a9d6',
  'Минимальный рейтинг': '#d27ac8',
};

function GroupChart({ data, series, isBar }: GroupChartProps) {
  const chartSetting = {
    yAxis: [{ label: 'Рейтинг аниме' }],
    height: 400,
  };

  const activeSeries = Object.entries(series)
    .filter((item) => item[1] === true)
    .map((item) => {
      const key = item[0] as keyof tSeries;
      return {
        dataKey: key,
        label: key,
        color: seriesColors[key],
      };
    });

  if (activeSeries.length === 0) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: 400, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        mt: 2,
        border: '1px dashed #ccc',
        borderRadius: '8px',
        backgroundColor: '#fafafa'
      }}>
        <Typography variant="body1" color="text.secondary">
          Выберите хотя бы одну метрику
        </Typography>
      </Box>
    );
  }

  const isSingleSeries = activeSeries.length === 1;

  const formattedSeries = activeSeries.map((s) => ({
    ...s,
    barLabel: isSingleSeries && isBar ? 'value' : undefined,
  }));

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={formattedSeries}
          slotProps={{
            legend: { position: { vertical: 'bottom', horizontal: 'center' } },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'point', dataKey: 'Группа' }]}
          series={formattedSeries}
          slotProps={{
            legend: { position: { vertical: 'bottom', horizontal: 'center' } },
          }}
          {...chartSetting}
        />
      )}
    </Box>
  );
}

export default GroupChart;