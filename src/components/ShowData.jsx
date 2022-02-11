import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Stack } from '@mui/material';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ShowData() {

     const [listData, setListData] = React.useState([""]);
  React.useEffect(() => {
    
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`)
      .then((res) => {
        setListData(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log(listData.completed);
      });
     }, []);
  
  
  const [open, setOpen] = React.useState(false);
  const [showData, setShowData] = React.useState(null);
  
  const handleClickOpen = (row) => {
    setShowData(row);
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteUsers = (row) => {
    if (window.confirm("Do you want to delete ?")) {
        console.log("deleted id",row.id);
      }
    }
  return (
    <Container sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>UserID</StyledTableCell>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Completed</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.map((row) => (
              <TableRow
                key={row.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.userId}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{`${row.completed ? true: false}` || `${row.completed ? false: true}`}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" size='small' onClick={(e) => handleClickOpen(row)}>
                      <EditIcon />
                    </Button>
                    <Button variant='outlined' size='small' onClick={(e) => deleteUsers(row)}>
                      <DeleteOutlineIcon />
                    </Button>
                  </Stack>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showData !== null && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ mx: "auto" }}>
            {"Update Data"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box sx={{ mx: "auto", width: 400, mt: 1 }} component="form">
                <Card variant="outlined">
                  <CardContent>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="userId"
                      label="userID"
                      name="userId"
                      autoComplete="userId"
                      autoFocus
                      value={showData.userId}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="id"
                      label="id"
                      name="id"
                      autoComplete="id"
                      autoFocus
                      value={showData.id}
                      
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      label="title"
                      name="title"
                      autoComplete="title"
                      autoFocus
                      value={showData.title}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="completed"
                      label="completed"
                      name="completed"
                      autoComplete="completed"
                      autoFocus
                      value={showData.completed}
                    />
                  </CardContent>
                </Card>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cannel</Button>
            <Button onClick={handleClose} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
