import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/table";
import type { Row } from "@tanstack/react-table";
import type { Transfer } from '@/features/transfer';
import { PriorityBadge, TypeBadge, StatusBadge } from './TransferBadges';
import { Button } from "@/features/shared/components/button";
import { Search, Settings, Camera, Clock } from "lucide-react";
import '@/features/transfers/styles/transfers.css';

interface TransfersTableProps {
  transfers: Transfer[];
  onSearch?: (query: string) => void;
  onApprove?: (transferId: string) => void;
  onDeny?: (transferId: string) => void;
}

interface CellProps {
  row: Row<Transfer>;
}

const formatDate = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getTimeAgo = (date: string | Date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
};

const TransfersTable: React.FC<TransfersTableProps> = ({
  transfers,
  onSearch,
  onApprove,
  onDeny,
}) => {
  const columns = [
    {
      accessorKey: "itemName",
      header: "Item Details",
      cell: ({ row }: CellProps) => {
        const itemName = row.original.itemName;
        const serialNumber = row.original.serialNumber;
        return (
          <div className="space-y-1">
            <p className="font-medium text-gray-200">{itemName}</p>
            <p className="text-sm text-gray-500">{serialNumber}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }: CellProps) => {
        const priority = row.original.priority;
        const notes = row.original.notes;
        return <PriorityBadge priority={priority} notes={notes} />;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: CellProps) => {
        const type = row.original.type;
        return <TypeBadge type={type} />;
      },
    },
    {
      accessorKey: "otherParty",
      header: "Other Party",
      cell: ({ row }: CellProps) => {
        const { rank, name, unit } = row.original.otherParty;
        return (
          <div className="space-y-1">
            <p className="font-medium text-gray-200">{rank}</p>
            <p className="text-sm text-gray-500">
              {name}
              {unit && (
                <span className="block text-xs text-gray-600">{unit}</span>
              )}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "timeline",
      header: "Timeline",
      cell: ({ row }: CellProps) => {
        const dateRequested = row.original.dateRequested;
        const dateNeeded = row.original.dateNeeded;
        return (
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
              Requested {getTimeAgo(dateRequested)}
            </div>
            {dateNeeded && (
              <div className="text-xs text-gray-600">
                Needed by: {formatDate(dateNeeded)}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: CellProps) => {
        const status = row.original.status;
        return <StatusBadge status={status} />;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: CellProps) => {
        const transfer = row.original;
        return (
          <div className="flex justify-end space-x-2">
            {transfer.status === 'needs_approval' && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onApprove?.(transfer.id)}
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Approve
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeny?.(transfer.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Deny
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="transfers-table-container">
      <div className="search-container">
        <div className="search-wrapper group">
          <Search className="search-icon group-hover:text-gray-300 transition-colors" />
          <input
            type="text"
            placeholder="Search transfers by item name, serial number, or personnel..."
            className="search-input"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Button variant="outline" className="filter-button">
          <Settings className="h-5 w-5" />
          <span>Filters</span>
        </Button>
        <Button variant="outline" className="filter-button">
          <Camera className="h-5 w-5" />
          <span>Scan QR</span>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id || column.accessorKey} className="text-gray-400 font-medium">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer.id} className="border-b border-gray-800">
              {columns.map((column) => (
                <TableCell key={column.id || column.accessorKey}>
                  {column.cell({ row: { original: transfer } as Row<Transfer> })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransfersTable;