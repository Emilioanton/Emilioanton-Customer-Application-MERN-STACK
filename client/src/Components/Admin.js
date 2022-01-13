import React, { useState, useEffect } from "react";
import { Table, TableHead, TableCell, TableRow, TableBody, Button, Typography, Box, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UserService from "../Services/UserService";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "./useDebounce";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles({
  thead: {
    backgroundColor: "#000000",
  },
  row: {
    "& > *": {
      fontSize: 14,
    },
  },
  pagination: {
    width: "100%",
  },
});

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalUsersDb, setTotalUsersDb] = useState(0);
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const debouncedValue = useDebounce(searchTerm, 500); // Bounce for searchtearm (delay)

  useEffect(() => {
    getAllUsers(false);
  }, [page]);

  useEffect(() => {
    getAllUsers(true);
  }, [debouncedValue]);

  const deleteUserData = async (id) => {
    await UserService.deleteUsers(id);
    getAllUsers();
  };

  const getAllUsers = async (reset) => {
    await fetch(`/user?page=${page}&search=${debouncedValue}`)
      .then((response) => response.json())
      .then(({ totalPages, users, totalUsersInDB }) => {
        if (reset) {
          setPage(1);
        }
        setUsers(users);
        setNumberOfPages(totalPages);
        setTotalUsersDb(totalUsersInDB);
      });
  };

  const [openDel, setOpenDel] = useState(false); // Delete dialog (popup)
  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleClose = (e) => {
    setOpenDel(false);
  };

  const [delId, setDelId] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Box style={{ minWidth: "1280px" }}>
      <Box
        style={{
          marginTop: "105px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0px",
          paddingTop: "10px",
          gap: "0px",
        }}
      >
        <div style={{ gridColumn: "1", width: "270px", paddingLeft: "10px", paddingTop: "25px" }}>
          <Pagination shape="rounded" color="standard" variant="outlined" siblingCount={0} count={numberOfPages} page={page} onChange={handleChange} />
        </div>

        <div
          style={{
            gridColumn: "2",
            textAlign: "center",
            positon: "fixed",
          }}
        >
          <TextField
            style={{ width: "400px" }}
            id="search"
            InputProps={{ startAdornment: <SearchIcon /> }}
            type="text"
            placeholder="Search for username, role or customer number"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div
          style={{
            gridColumn: "3",
            paddingTop: "15px",
            marginLeft: "auto",
            marginRight: "20px",
            position: "static",
            display: "block",
          }}
        >
          <Button style={{ fontWeight: "bold", width: "140px" }} color="primary" variant="contained" component={Link} to={"/adduser"}>
            Add user <AddIcon />
          </Button>
        </div>
      </Box>
      <div
        style={{
          paddingTop: "10px",
          width: "100%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow className={classes.thead}>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Companyname</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Username</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Language</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Customernumber</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
              <TableCell style={{ color: "#e50914", fontWeight: "bold", fontSize: 17 }}>Total users: {totalUsersDb}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow hover={true} className={classes.row} key={user._id}>
                <TableCell style={{ height: "1px" }}>{user.companyname}</TableCell>
                <TableCell style={{ height: "1px" }}>{user.username}</TableCell>
                <TableCell style={{ height: "1px" }}>{user.language}</TableCell>
                <TableCell style={{ height: "1px" }}>{user.custnumb}</TableCell>
                <TableCell style={{ height: "1px" }}>{user.role}</TableCell>
                <TableCell>
                  <Button color="primary" variant="contained" style={{ marginRight: 10, fontWeight: "bold" }} component={Link} to={`/edit/${user._id}`}>
                    Edit
                  </Button>
                  <Button
                    style={{ fontWeight: "bold" }}
                    color="error"
                    variant="contained"
                    onClick={() => {
                      handleClickOpenDel();
                      setDelId(user._id);
                      setUsername(user.username);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={openDel} onClose={handleClose} aria-labelledby="confirm-dialog">
        <DialogContent>
          <Alert severity="info">Your are deleting the user "{username}" do you wish to continue?</Alert>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="error">
            No
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setOpenDel(false);
              deleteUserData(delId);
            }}
            style={{ color: "white", backgroundColor: "green" }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;
