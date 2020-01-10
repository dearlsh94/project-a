import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import TopBar from '../../TopBar';

import { signInWithEmailAndPassword } from '../../shared/Firebase';

const styles: any = {
    heroContent: {

    },
    paper: {
        marginTop: 10
    },
    form: {
        marginTop: 20
    },
    btnSignIn: {
        marginTop: 20
    }
  };

interface IProps{
    classes: any,
}

interface IState{
    email: string,
    password: string,
}

class SignUp extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    checkValidate = () => {
        if (this.state.email === '') {
            alert("Please Input Email");
            return false;
        }
            
        if (this.state.password === '') {
            alert("Please Input Password");
            return false;
        }

        return true;
    }

    handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: e.target.value,
        });
    }

    handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleSignUp = () => {
        if (!this.checkValidate()) {
            return false;
        }

        signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        
                    })
                );
            })
            .then(() => {
                alert("Login Successed!!!");
                //window.location.href="/";
            })
            .catch((err) => {
                alert(err.message);
                console.log('login failed', err);
            });
    }

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;

        return(
            <div>
                <TopBar
                    barText="SignUp"/>
                <div className={classes.heroContent}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={this.handleChangeEmail}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={this.handleChangePassword}
                                />
                                </Grid>
                            </Grid>
                            <Button
                                className={classes.btnSignIn}
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleSignUp}
                            >
                                Sign In
                            </Button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SignUp);