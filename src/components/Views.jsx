import React from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Card, CardContent } from '@mui/material';
import axios from 'axios'


function Views() {

  const [listData, setListData] = React.useState({
          userID: "",
          id: "",
          title: "",
          completed: ""
     });

     var data = ({
          "userId": listData.userID,
          "id": listData.id,
          "title": listData.title,
          "completed": listData.completed
     });
     var config = {
          method: 'get',
          url: 'https://jsonplaceholder.typicode.com/todos',
          headers: {
               'Content-Type': 'application/json'
          },
          data: data
     };

     axios(config)
          .then(function (response) {
               console.log(response.data);
               setListData(response.data);
          })
          .catch(function (error) {
               console.log(error);
          });
  return (
    <div>
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
            />
          </CardContent> 
        </Card>
      </Box>
    </div>
  );
}

export default Views