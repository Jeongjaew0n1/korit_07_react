// EditCar.tsx

import { Car, CarResponse, CarEntity } from "../types";
import { ChangeEvent, useState } from "react";
import { Dialog, DialogActions, DialogTitle, Button, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi.ts"
import EditRoundedIcon from '@mui/icons-material/EditRounded';

type FormProps = {
  cardata: CarResponse
}

function EditCar({cardata}: FormProps) {
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });

  const handleClickOpen = () => {
    setOpen(true); // Modal이 열렸을 때 특정 id 값에 맞는 정보를 불러와서 AddCar에서의 handleClickOpen()과 코드라인의 차이가 생깁니다.
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price
    });
  }

  const handleClickClose = () => setOpen(false);

  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntity: CarEntity = { car, url };
    mutate(carEntity);
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0
    });
    setOpen(false);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateCar, {
      onSuccess: () => {
        queryClient.invalidateQueries(["cars"]);
      },
      onError: err => {
        console.log(err);
      },
    });

  return(
    <>
    <Tooltip title='Edit'>
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditRoundedIcon fontSize="large"/>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Save | 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCar;