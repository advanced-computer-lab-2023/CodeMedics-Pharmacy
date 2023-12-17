import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import { Box, Card, CardContent, CardHeader, IconButton, SvgIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../../components/chart';
import { Scrollbar } from '../../../components/scrollbar';
import PropTypes from 'prop-types';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100]
      },
      type: 'gradient'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    markers: {
      size: 6,
      strokeColors: theme.palette.background.default,
      strokeWidth: 3
    },
    stroke: {
      curve: 'smooth'
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const TotalSalesChart = (props) => {
  const { chartSeries } = props;
  const chartOptions = useChartOptions();

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'neutral.100',
        p: 3
      }}
    >
      <Card>
        <CardHeader
          action={(
            <IconButton>
              <SvgIcon>
                <DotsHorizontalIcon/>
              </SvgIcon>
            </IconButton>
          )}
          title="Sales chart"
        />
        <CardContent>
          <Scrollbar>
            <Box
              sx={{
                height: 375,
                minWidth: 500,
                position: 'relative'
              }}
            >
              <Chart
                height={350}
                width={800}
                options={chartOptions}
                series={chartSeries}
                type="area"
              />
            </Box>
          </Scrollbar>
        </CardContent>
      </Card>
    </Box>
  );
};
TotalSalesChart.prototype = {
  chartSeries: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number)
  }))
};