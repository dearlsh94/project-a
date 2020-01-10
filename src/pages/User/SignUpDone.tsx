import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TopBar from '../../TopBar';

const styles = {
    content: {
        width: '100%',
        textAlign: 'center' as 'center',
    }
}

interface IProps{
    classes: any,
}

interface IState{
    mvsec: number;
}

class SignUpDone extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            mvsec: 5,
        }
    }

    countTime = () => {
        setTimeout(() => {
            this.setState({
                mvsec: this.state.mvsec-1,
            });
        }, 1000);
    }

    componentDidMount() {
        this.countTime();
    }

    componentDidUpdate() {
        this.countTime();    
        
        if (this.state.mvsec === 0) {
            window.location.href="/user/signin";
        }
    }

    render() {
        const { classes } = this.props;
        const { mvsec } = this.state;

        return(
            <div>
                <TopBar
                    barText="SignUp Done"/>
                <div
                    className={classes.content}>
                    <Typography>
                        Congraturations!! you've got the account!
                    </Typography>
                    <Typography>
                        Move to Login Page after {mvsec} seconds.
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SignUpDone);