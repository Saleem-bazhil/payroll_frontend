const DataTable = ({ columns, data, emptyMessage = "No records found." }) => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted/60 backdrop-blur">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className={`text-left font-medium text-muted-foreground px-5 py-3.5 text-xs uppercase tracking-wider ${c.className || ""}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr className="border-t border-border">
                <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/40 transition">
                  {columns.map((c) => (
                    <td key={c.key} className={`px-5 py-4 ${c.className || ""}`}>
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
