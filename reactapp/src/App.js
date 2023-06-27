import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BooksWindow from './booksWindow';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default class App extends Component
{
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { activeWindow: "totalBooks", jwt: "", userName : "" , password : "", loginOpen: false };//
    }

    render()
    {
        return (
            <div>
                <Box sx={{ flexGrow: 1 }}>
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
                <BooksWindow />
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
    async doLogin() {
        const response = await fetch(
            `api/login?login=${this.state.userName}&password=${this.state.password}`,
            { method: "POST", headers: { "accept": "*/*"} }
        )
        const data = await response.json();
        this.setState({ jwt: data.accessToken, userName: data.userName, loginOpen:false })
    }
}
