import {
  Box,
  Card,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../../components/chart';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
const chartSeries = [
  {
    data: [0, 2000, 22, 3000, 13, 2000, 37, 21, 4500, 22, 600]
  }
];

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
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
      opacity: 1,
      type: 'solid'
    },
    grid: {
      show: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    }
  };
};

const Graphic = () => {
  const chartOptions = useChartOptions();

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: 54,
        width: 177
      }}
    >
      <Chart
        width={200}
        height={54}
        options={chartOptions}
        series={chartSeries}
        type="line"
      />
    </Box>
  );
};

export const OverviewFilter = (props) => {
  const { Data, filter, setFilter } = props;
  const Labels = [
    'Available Quantity',
    'Quantity sold',

  ];
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/Medicine/getMedicinesNames', { withCredentials: true })
         .then((response) => {
           setMedicines(response.data['medicineNames']);
         })
         .catch((error) => {
           console.log(error);
         });
  }, []);


  const status = medicines.map(medicine => ({
    value: medicine,
    label: medicine,
  }));

  console.log(status);
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'neutral.800'
          : 'neutral.100',
        p: 3,
        borderRadius: 3
      }}
    > <Grid container>
      <Grid xs={12} md={4}>
        <Card sx={{ p: 2 }}>
          <Stack direction="row" spacing={3}>
            <TextField
              sx={{ width: 400 }}
              id="Medicine"
              select
              fullWidth
              label="Medicine"
              defaultValue={status[0]?.value}
              helperText=""
              onChange={(event) => setFilter(event.target.value)}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Card>
      </Grid>
    </Grid>
      <Card>

        <Grid
          container
          sx={{
            '& > *:not(:last-of-type)': {
              borderRight: (theme) => ({
                md: `1px solid ${theme.palette.divider}`
              }),
              borderBottom: (theme) => ({
                md: 'none',
                xs: `1px solid ${theme.palette.divider}`
              })
            }
          }}
        >
          <Grid
            xs={12}
            md={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              sx={{ p: 3 }}
              spacing={2}
            >
              <div>
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  {Labels[0]}
                </Typography>
                <Typography variant="h5">
                  {Data[0]}
                </Typography>
                {/*<Typography*/}
                {/*  color="text.secondary"*/}
                {/*  variant="caption"*/}
                {/*>*/}
                {/*  vs. $1,214.20 last day*/}
                {/*</Typography>*/}
              </div>
              <Graphic/>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              sx={{ p: 3 }}
              spacing={2}
            >
              <div>
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  {Labels[1]}
                </Typography>
                <Typography variant="h5">
                  {Data[1]}
                </Typography>
                {/*<Typography*/}
                {/*  color="text.secondary"*/}
                {/*  variant="caption"*/}
                {/*>*/}
                {/*  vs. $252.00 last day*/}
                {/*</Typography>*/}
              </div>
              <Graphic/>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              sx={{ p: 3 }}
              spacing={2}
            >
              <div>
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  Total Amount Sold
                </Typography>
                <Typography variant="h5">
                  {Data[2]}
                </Typography>
                {/*<Typography*/}
                {/*  color="text.secondary"*/}
                {/*  variant="caption"*/}
                {/*>*/}
                {/*  vs. $683.00 last day*/}
                {/*</Typography>*/}
              </div>
              <Graphic/>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
OverviewFilter.propTypes = {
  Data: PropTypes.array
};