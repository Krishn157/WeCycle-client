import MaterialTable from "material-table";
import React from "react";
import { useState } from "react";

const CustomTable = ({ headings, data, title }) => {
  const columns = [];
  const [selectedRow, setSelectedRow] = useState(null);
  headings.forEach((header) => {
    columns.push({
      title: header,
      field: header,
    });
  });
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      options={{
        exportButton: true,
        headerStyle: {
          backgroundColor: "#EEE",
          color: "#243A73",
        },
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
        }),
      }}
    />
  );
};

export default CustomTable;
