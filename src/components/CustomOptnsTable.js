import MaterialTable from "material-table";
import React from "react";
import { useState } from "react";

const CustomOptnsTable = ({
  headings,
  data,
  title,
  actionFunc,
  cancelFunc,
}) => {
  const columns = [];
  const [selectedRow, setSelectedRow] = useState(null);
  headings.forEach((header) => {
    columns.push({
      title: header,
      field: header,
    });
  });

  console.log(data);
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
          onClick: (event, rowData) => {
            console.log(rowData);
            actionFunc(rowData.id);
          },
        },
        (rowData) => ({
          icon: "cancel",
          tooltip: "Reject Req",
          onClick: (event, rowData) => cancelFunc(rowData.id),
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

export default CustomOptnsTable;
