import TableRow from './TableRow';

const TableHead = ({ head }) => (
  <thead>
    <TableRow row={head} isHead={true} />
  </thead>
);

export default TableHead;