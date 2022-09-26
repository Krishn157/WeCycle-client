import MaterialTable from "material-table";
import React from "react";

const CustomTable = () => {
  return (
    <MaterialTable
      title="Positioning Actions Column Preview"
      columns={[
        { title: "Producer Name", field: "name" },
        { title: "Waste Type", field: "type" },
        { title: "Primary Substance", field: "substance" },
        { title: "Quantity", field: "quantity", type: "numeric" },
        {
          title: "Requested On",
          field: "reqDate",
        },
      ]}
      data={[
        {
          name: "Company 1",
          type: "Type-1",
          substance: "Substance1",
          quantity: "100kg",
          reqDate: "12/02/2021",
        },
        {
          name: "Company 2",
          type: "Type-1",
          substance: "Substance2",
          quantity: "100kg",
          reqDate: "02/07/2022",
        },
        {
          name: "Company 3",
          type: "Type-2",
          substance: "Substance4",
          quantity: "100kg",
          reqDate: "21/08/2022",
        },
        {
          name: "Company 4",
          type: "Type-3",
          substance: "Substance3",
          quantity: "90kg",
          reqDate: "12/09/2022",
        },
      ]}
      actions={[
        {
          icon: "done",
          tooltip: "Save User",
          onClick: (event, rowData) => alert("You saved " + rowData.name),
        },
        (rowData) => ({
          icon: "cancel",
          tooltip: "Delete User",
          onClick: (event, rowData) =>
            alert("You want to delete " + rowData.name),
          disabled: rowData.birthYear < 2000,
        }),
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
};

export default CustomTable;
