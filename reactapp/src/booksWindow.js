import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default class BooksWindow extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [], loading: true };
    }

    componentDidMount() {
        this.getBooks();
    }
    static renderBooksTable(books) {
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
        }));

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));
        return (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="Books">
                <TableHead>
                    <TableRow>
                            <StyledTableCell>Books</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map(books => 
                        <StyledTableRow key={books.name}>
                            <StyledTableCell component="th" scope="row">
                                {books.name}
                            </StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>);
    }
    render() {
        let contents = this.state.loading
            ? <p>Loading... </p>
            : BooksWindow.renderBooksTable(this.state.books);
        return (
            <div>
                {contents}
            </div>
        )
    };

    async getBooks() {
        const response = await fetch('api/');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }
}