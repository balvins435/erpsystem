// utils/csvExport.js

export const exportToCSV = (filename, headers, data) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const csvRows = [
    headers.map(h => `"${h.label}"`).join(','),
    ...data.map(row =>
      headers.map(h => {
        const value = row[h.key] ?? '';
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    )
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
