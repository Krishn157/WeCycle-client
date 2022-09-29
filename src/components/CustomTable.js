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
      actions={[
        {
          icon: "check",
          tooltip: "Accept Req",
          onClick: (event, rowData) => alert("You saved " + rowData.name),
        },
        (rowData) => ({
          icon: "cancel",
          tooltip: "Reject Req",
          onClick: (event, rowData) =>
            alert("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000,
        }),
      ]}
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
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default CustomTable;
