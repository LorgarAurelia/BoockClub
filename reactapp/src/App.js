import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import AllBooksWindow from './booksWindow';
import BooksToReed from './booksToRead';
import MyBooks from './myBook';
import './App.css';


export default class App extends Component
{
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { jwt: "", userName: "", password: "", loginOpen: false, hiddenStatus: "hidden", navigation : 2 };
    }
    render()
    {
        let table;
        switch (this.state.navigation)
        {
            case 0:
                table = App.renderMyBooksTable(this.state.jwt);
                break;
            case 1:
                table = App.renderBooksToRead(this.state.jwt);
                break;
            default:
                table = App.renderAllBoksTable();
                break;
        }
        return (
            <div>
                <Box className="header" sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                Books List
                            </Typography>
                            <Button onClick={this.handleLoginOpen.bind(this)} color="inherit">Login</Button>
                            <Dialog open={this.state.loginOpen} aria-labelledby = "login-form">
                            <DialogTitle id = "login-form">LogIn</DialogTitle>
                                <DialogContent>
                                    <TextField value={this.state.userName}
                                        onChange={this.handleLogin.bind(this)}
                                        label="Login"
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                    />
                                    <TextField value={this.state.password}
                                        onChange={this.handlePassword.bind(this)}
                                        label="Password"
                                        variant="outlined"
                                        margin="dense"
                                        type="password"
                                        fullWidth
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleLoginClose.bind(this)}>Cancel</Button>
                                    <Button onClick={this.doLogin.bind(this) }>Log In</Button>
                                </DialogActions>
                            </Dialog>
                        </Toolbar>
                    </AppBar>
                </Box>

                {table}

                <div className={this.state.hiddenStatus}>
                    <Box>
                        <BottomNavigation
                            showLabels
                            value={this.state.navigation}
                            onChange={this.switchWindow.bind(this) }
                        >
                            <BottomNavigationAction label="My books" icon={<RestoreIcon />} />
                            <BottomNavigationAction label="All books" icon={<FolderIcon />} />
                        </BottomNavigation>
                    </Box>
                </div>
            </div>
        );
    }
    handleLoginOpen() {
        this.setState({ loginOpen: true });
    }
    handleLoginClose() {
        this.setState({ loginOpen: false });
    }
    handleLogin(event) {
        this.setState({userName: event.target.value})
    }
    handlePassword(event) {
        this.setState({ password: event.target.value})
    }

    switchWindow(event, newValue) {
        this.setState({navigation: newValue})
    }

    static renderAllBoksTable() {
        return (<AllBooksWindow />)
    }
    static renderMyBooksTable(token) {
        return (<MyBooks jwt={token }></MyBooks>)
    }
    static renderBooksToRead(token) {
        return (<BooksToReed jwt={token} />)
    }

    async doLogin() {
        const response = await fetch(
            `api/login?login=${this.state.userName}&password=${this.state.password}`,
            { method: "POST", headers: { "accept": "*/*"} }
        )
        if (response.status === 401) {
            alert('Wrong password')
            return;
        }
        const data = await response.json();
        this.setState({ jwt: data.accessToken, userName: data.userName, loginOpen: false, hiddenStatus:"show", navigation:0 })
    }
}
