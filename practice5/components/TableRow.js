const TableRow = ({ row, isHead = false, className = '' }) => {
  const CellTag = isHead ? 'th' : 'td';
  return (
    <tr className={className}>
      {row.map((item, idx) => (
        <CellTag key={idx} width={idx === 0 ? "300" : "150"} height="50" align={isHead ? "center" : undefined}>
          {item}
        </CellTag>
      ))}
    </tr>
  );
};

export default TableRow;