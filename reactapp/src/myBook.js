import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default class MyBooks extends Component
{
    constructor(props) {
        super(props);
        this.state = { jwt: this.props.jwt, books: [], loading: true, showMessage: false, bookId: 0, needToReload: false, pageState: "init" }
    }

    componentDidMount() {
        this.getBooks();
    }

    static renderBooksTable(books, onClick) {
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
                            <StyledTableCell>Delete book</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(books =>
                            <StyledTableRow key={books.name}>
                                <StyledTableCell component="th" scope="row">
                                    {books.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button value={books.id} onClick={onClick}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>);
    }

    render() {
        //let contents = this.state.loading
        //    ? <p>Loading... </p>
        //    : MyBooks.renderBooksTable(this.state.books, this.deleteBook.bind(this));
        let contents;
        switch (this.state.pageState) {
            case 'init':
                contents = <p>Loading... </p>;
                break;
            case 'loaded':
                contents = MyBooks.renderBooksTable(this.state.books, this.deleteBook.bind(this));
                break;
            default: break;
        }

        const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
        });

        return (
            <div>
                {contents}
                <Snackbar open={this.state.showMessage} autoHideDuration={6000} onClose={this.handleClose.bind(this)}>
                    <Alert onClose={this.handleClose.bind(this)} severity="success" sx={{ width: '100%' }}>
                        Boock deleted!
                    </Alert>
                </Snackbar>
            </div>
        )
    };

    async getBooks() {
        const response = await fetch(
            'api/userbooks',
            { method: 'GET', headers: { accept: '*/*', Authorization: `Bearer ${this.state.jwt}` } });
        const data = await response.json();
        this.setState({ books: data, pageState: "loaded" });
    }

    async deleteBook(event) {
        await this.setState({ bookId: event.target.value })
        await fetch(
            `api/deleteBook?bookId=${this.state.bookId}`,
            { method: 'DELETE', headers: { accept: '*/*', Authorization: `Bearer ${this.state.jwt}` } });
        await this.setState({ showMessage: true, pageState: "init" })
        this.getBooks();
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showMessage: false })
    }
    
}