import React, { useEffect, useState } from 'react'
import { createStyles, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AlertDialog from './AlertDialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const styles = () => createStyles({
    table: {
        width: 400,
        margin: "auto"
    }
});
interface Props extends WithStyles<typeof styles> {
    data: any[]
}


const TaskTable = (props: Props) => {

    const [state, setState] = useState(props)
    const [hasError, setErrors] = useState(false);
    const [selectedValue, setSelectedValue] = useState(-1);

    const [open, setOpen] = React.useState(false);

    const closeDialog = () => {
        setOpen(false);
    }
    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        const res = await fetch("http://127.0.0.1:3001/tasks");
        res.json()
            .then(res => setState({ ...state, data: res.data }))
            .catch(err => setErrors(err));
    }

    const handleAccept = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://127.0.0.1:3001/tasks/${selectedValue}`, requestOptions).then(() => {
            closeDialog();
            fetchData();
        });
    };

    function deleteTask(id: number): void {
        setSelectedValue(id);
        setOpen(true);
    }

    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center">
            <AlertDialog
                open={open}
                onAccept={handleAccept}
                onClose={closeDialog}></AlertDialog>
            <Paper sx={{ width: '70%', mb: 2 }}>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell align="right">Title</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Author</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.data.map((row) => (

                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.authorId}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => deleteTask(row.id)} variant="contained" color="primary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )


}
export default withStyles(styles, { withTheme: true })(TaskTable);
