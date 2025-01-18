import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Toolbar,
  Typography,
  Tooltip,
  Checkbox,
  Box,
  alpha,
} from '@mui/material';
import { Search, Settings, Trash2, FileDown } from 'lucide-react';
import { PriorityBadge, TypeBadge, StatusBadge } from "../TransferBadges";
import type { Transfer, TransferType, TransferPriority, TransferStatus } from '../../types';

// Mock data
const MOCK_TRANSFERS: Transfer[] = [
  {
    id: '1',
    itemName: 'M4A1 Carbine',
    serialNumber: 'W123456',
    type: 'outgoing',
    priority: 'high',
    category: 'weapons',
    status: 'needs_approval',
    dateRequested: '2024-01-28T10:00:00Z',
    dateNeeded: '2024-02-01T00:00:00Z',
    notes: 'Immediate transfer required for deployment',
    otherParty: {
      name: 'John Smith',
      rank: 'SGT',
      unit: '1st Battalion, 75th Ranger Regiment'
    },
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z'
  },
  {
    id: '2',
    itemName: 'Night Vision Goggles',
    serialNumber: 'NV789012',
    type: 'incoming',
    priority: 'medium',
    category: 'equipment',
    status: 'completed',
    dateRequested: '2024-01-25T15:30:00Z',
    dateNeeded: '2024-01-30T00:00:00Z',
    otherParty: {
      name: 'Sarah Johnson',
      rank: 'CPT',
      unit: '3rd Special Forces Group'
    },
    createdAt: '2024-01-25T15:30:00Z',
    updatedAt: '2024-01-26T09:15:00Z'
  },
  {
    id: '3',
    itemName: 'Medical Kit',
    serialNumber: 'MED345678',
    type: 'outgoing',
    priority: 'low',
    category: 'medical',
    status: 'pending_other',
    dateRequested: '2024-01-27T09:15:00Z',
    dateNeeded: '2024-02-05T00:00:00Z',
    notes: 'Standard resupply',
    otherParty: {
      name: 'Michael Brown',
      rank: 'SFC',
      unit: '28th Combat Support Hospital'
    },
    createdAt: '2024-01-27T09:15:00Z',
    updatedAt: '2024-01-27T14:30:00Z'
  },
  {
    id: '4',
    itemName: 'Radio Set',
    serialNumber: 'COM567890',
    type: 'incoming' as TransferType,
    priority: 'high' as TransferPriority,
    category: 'communications',
    status: 'needs_approval' as TransferStatus,
    dateRequested: '2024-01-26T14:20:00Z',
    dateNeeded: '2024-01-29T00:00:00Z',
    notes: 'Urgent replacement needed',
    otherParty: {
      name: 'David Wilson',
      rank: 'SSG',
      unit: '112th Signal Battalion'
    },
    createdAt: '2024-01-26T14:20:00Z',
    updatedAt: '2024-01-26T14:20:00Z'
  },
  {
    id: '5',
    itemName: 'HMMWV',
    serialNumber: 'VEH901234',
    type: 'outgoing' as TransferType,
    priority: 'medium' as TransferPriority,
    category: 'vehicles',
    status: 'completed' as TransferStatus,
    dateRequested: '2024-01-24T11:45:00Z',
    dateNeeded: '2024-02-03T00:00:00Z',
    otherParty: {
      name: 'Emily Davis',
      rank: '1LT',
      unit: '1st Armored Division'
    },
    createdAt: '2024-01-24T11:45:00Z',
    updatedAt: '2024-01-25T16:20:00Z'
  },
  {
    id: '6',
    itemName: '5.56mm Ammunition',
    serialNumber: 'AMM123456',
    type: 'incoming' as TransferType,
    priority: 'high' as TransferPriority,
    category: 'ammunition',
    status: 'pending_other' as TransferStatus,
    dateRequested: '2024-01-28T08:30:00Z',
    dateNeeded: '2024-01-31T00:00:00Z',
    notes: 'Range qualification requirement',
    otherParty: {
      name: 'Robert Taylor',
      rank: 'MSG',
      unit: '10th Mountain Division'
    },
    createdAt: '2024-01-28T08:30:00Z',
    updatedAt: '2024-01-28T10:45:00Z'
  }
];

interface TransfersTableProps {
  transfers?: Transfer[];
}

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Transfer | 'actions';
  label: string;
  numeric: boolean;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  { id: 'itemName', label: 'Item Details', numeric: false, sortable: true },
  { id: 'priority', label: 'Priority', numeric: false, sortable: true },
  { id: 'type', label: 'Type', numeric: false, sortable: true },
  { id: 'otherParty', label: 'Other Party', numeric: false, sortable: false },
  { id: 'dateRequested', label: 'Timeline', numeric: false, sortable: true },
  { id: 'status', label: 'Status', numeric: false, sortable: true },
  { id: 'actions', label: 'Actions', numeric: false, sortable: false },
];

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TransfersTable: React.FC<TransfersTableProps> = ({ transfers = MOCK_TRANSFERS }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Transfer>('dateRequested');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Add console log to debug
  console.log('Raw transfers data:', transfers);

  const filteredTransfers = transfers.filter((transfer) =>
    transfer.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transfer.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transfer.otherParty.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Filtered transfers:', filteredTransfers);

  const handleRequestSort = (property: keyof Transfer) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = transfers.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        bgcolor: '#121212',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }
      }}
    >
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search transfers by item name, serial number, or personnel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="h-4 w-4" />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2) !important',
                },
              }
            }}
            sx={{ flex: 1 }}
          />
        )}

        {selected.length > 0 ? (
          <>
            <Tooltip title="Delete">
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export">
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <FileDown className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <Settings className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                padding="checkbox"
                sx={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < transfers.length}
                  checked={transfers.length > 0 && selected.length === transfers.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 600,
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id as keyof Transfer)}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: 'rgba(255, 255, 255, 0.3) !important',
                        },
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransfers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transfer) => {
                const isItemSelected = isSelected(transfer.id);

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(transfer.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={transfer.id}
                    selected={isItemSelected}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08) !important',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(255, 255, 255, 0.12) !important',
                      },
                      '&.Mui-selected:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.16) !important',
                      },
                    }}
                  >
                    <TableCell 
                      padding="checkbox"
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {transfer.itemName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {transfer.serialNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <PriorityBadge priority={transfer.priority} />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <TypeBadge type={transfer.type} />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {transfer.otherParty.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {transfer.otherParty.rank} • {transfer.otherParty.unit}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Requested: {formatDate(transfer.dateRequested)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Needed by: {formatDate(transfer.dateNeeded)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <StatusBadge status={transfer.status} />
                    </TableCell>
                    <TableCell 
                      align="right"
                      sx={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                          }
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTransfers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.7)',
          '.MuiTablePagination-select': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '.MuiTablePagination-selectIcon': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        }}
      />
    </Paper>
  );
};

export default TransfersTable;