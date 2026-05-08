import TableRow from './TableRow';

const TableBody = ({ body, numPage, amountRows }) => {
  const start = (numPage - 1) * amountRows;
  const end = start + Number(amountRows);

  return (
    <tbody>
      {body.map((item, index) => (
        <TableRow
          key={index}
          row={Object.values(item)}
          isHead={false}
          className={index >= start && index < end ? 'show' : 'hide'}
        />
      ))}
    </tbody>
  );
};

export default TableBody;