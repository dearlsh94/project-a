import React, {Component} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import IUser from '../../models/IUser';
import TopBar from '../../TopBar';

import { signUpWithEmailAndPassword } from '../../shared/Firebase';
import IMetaData from '../../models/IMetadata';

const styles: any = {
  };

interface IProps{
    classes: any,
}

interface IState{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAgree: boolean,
}

class SignUp extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isAgree: false,
        }
    }

    inputValidate = () => {
        
    }

    handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            firstName: e.target.value,
        });
    }

    handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            lastName: e.target.value,
        });
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

    handleChangeIsAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isAgree: e.target.checked,
        });
    }

    handleClear = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isAgree: false,
        });  
    };

    handleSignUp = () => {
        const md: IMetaData = {
            createDate: new Date().getTime(),
            creater: 'sys',
            editDate: new Date().getTime(),
            editer: 'sys',
            using: true
        }

        const user: IUser = {
            uid: null,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            isAgree: this.state.isAgree,
            metadata: md,
        }

        signUpWithEmailAndPassword(user)
            .then((res) => {
                if(res) {
                    alert("Created!!!");
        
                    this.handleClear();
                    window.location.href="/user/signup/done";
                }
            })
            .catch((err) => {
                alert("Failed!!!");
                console.log('Error creating new user:', err);
            });
    }

    render() {
        const { classes } = this.props;
        const { firstName, lastName, email, password, isAgree } = this.state;

        return(
            <div>
                <TopBar
                    barText="SignUp"/>
                <div className={classes.heroContent}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Typography
                                onClick={this.handleClear}>
                                clear
                            </Typography>
                            <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoComplete="fname"
                                    value={firstName}
                                    onChange={this.handleChangeFirstName}
                                    autoFocus
                                />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={lastName}
                                    onChange={this.handleChangeLastName}
                                />
                                </Grid>
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
                                <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            value="allowExtraEmails" 
                                            color="primary" 
                                            checked={isAgree}
                                            onChange={this.handleChangeIsAgree}/>
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                                </Grid>
                            </Grid>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSignUp}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                                </Grid>
                            </Grid>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SignUp);