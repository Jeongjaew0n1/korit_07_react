import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function Carlist() {
  const queryClient = useQueryClient();
  const [ open, setOpen ] = useState(false);
  const { data, error, isSuccess } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  });

  const { mutate } = useMutation(deleteTodo, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["todos"]});
    },
    onError: err => {
      console.log(err);
    },
  })

  const columns: GridColDef[] = [
    {field: 'brand', headerName: 'Brand', width: 200},
    {field: 'model', headerName: 'Model', width: 200},
    {field: 'color', headerName: 'Color', width: 200},
    {field: 'registrationNumber', headerName: 'Reg.nr', width: 150},
    {field: 'modelYear', headerName: 'Model Year', width: 150},
    {field: 'price', headerName: 'Price', width: 150},
    {
      field: 'edit',
      headerName: '수정',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditCar cardata={params.row} />
        )
    },
    {
      field: 'delete',
      headerName: '삭제',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip title='Delete'>
          <IconButton aria-label="delete"
            onClick={() => {
              if (confirm(`${params.row.brand}의 ${params.row.model} 자동차를 삭제하시겠습니까?`)) {
                mutate(params.row._links.self.href);}}
              }
          >
            <DeleteForeverRoundedIcon  fontSize="large"/>
          </IconButton>
        </Tooltip>
      )
    }
  ];

  if(!isSuccess) {
    return <span>Loading... 🔮</span>
  }

  if (error) {
    return <span>자동차들을 불러오는 데 실패했습니다. 😱</span>
  }
  else {
    return (
      // <table>
      //   <tbody>
      //     {
      //       data.map((car: CarResponse) =>
      //         <tr key={car._links.self.href}>
      //           <td>{car.brand}</td>
      //           <td>{car.model}</td>
      //           <td>{car.color}</td>
      //           <td>{car.registrationNumber}</td>
      //           <td>{car.modelYear}</td>
      //           <td>{car.price}</td>
      //         </tr>
      //       )
      //     }
      //   </tbody>
      // </table>
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={row => row._links.self.href}
          slots={{toolbar: GridToolbar}}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='선택한 자동차 정보가 삭제되었습니다 🚓'
        />
      </>
    )
  }
}

export default Carlist