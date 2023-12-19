import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from 'src/icons/untitled-ui/duocolor/SearchRefraction';
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { useUpdateEffect } from '../../../hooks/use-update-effect';

const tabOptions = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Completed',
    value: 'completed'
  },
  {
    label: 'Ordered',
    value: 'ordered'
  },
  {
    label: 'Canceled',
    value: 'canceled'
  },
];

const sortOptions = [
  {
    label: 'Newest',
    value: 'desc'
  },
  {
    label: 'Oldest',
    value: 'asc'
  }
];

export const OrderListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc', onSearchChange} = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    query: undefined,
    status: undefined
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);
    const status = tab === 'all' ? undefined : tab;

    setFilters((prevState) => ({
      ...prevState,
      status
    }));
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    const query = queryRef.current?.value || '';
    console.log('query  ', query);
    setFilters((prevState) => ({
      ...prevState,
      query
    }));
  }, []);

  const handleSortChange = useCallback((event) => {
    const sortDir = event.target.value;
    onSortChange?.(sortDir);
  }, [onSortChange]);

  return (
    <div>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabOptions.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            name="orderNumber"
            placeholder="Search by order number"
            onChange={(event) => onSearchChange(event.target.value)}
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Box>
      </Stack>
    </div>
  );
};

OrderListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
};
