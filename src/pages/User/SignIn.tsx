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

class SignIn extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    // define ref zone start
    refEmail: any = '';
    refPassword: any = '';
    refSignIn: any = '';
    // define ref zone end

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

    handleKeyUpEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.refPassword.focus();
        }
    }

    handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleKeyUpPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.refSignIn.focus();
            this.handleSignUp();
        }
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

                console.log("User Info : ", localStorage.getItem("userInfo"));
            })
            .then(() => {
                alert("Login Successed!!!");
                //window.location.href="/";
            })
            .catch((err) => {
                alert(err.message);
                console.log('login failed', err);
                
                this.refPassword.focus();
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
                                    onKeyUp={this.handleKeyUpEmail}
                                    inputRef={ref => this.refEmail = ref}
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
                                    onKeyUp={this.handleKeyUpPassword}
                                    inputRef={ref => this.refPassword = ref}
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
                                buttonRef={ref => this.refSignIn = ref}
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

export default withStyles(styles)(SignIn);