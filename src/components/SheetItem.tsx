import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ISheet from '../models/ISheet';

import {dwFirstImgSheet} from "../shared/Firebase";

const classes: any = makeStyles(theme => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
      height: 140,
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

interface IProps{
    sheet: ISheet
}

interface IStates{
    url: string,
}

export default class SheetItem extends Component<IProps, IStates> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            url: "",
        }
    }

    componentDidMount() {
        console.log(this.state.url);

        
        dwFirstImgSheet(this.props.sheet)
            .then((_url: any) => {
                
                this.setState({
                    url: _url,
                })
                
            });
        
    }

    handleView = () => {
        console.log(this.props.sheet.title + " View");
        document.location.href="/sheet/view/" + this.props.sheet.key;
    }

    handleEdit = () => {
        console.log(this.props.sheet.title + " Edit");    
    }

    render(){
        const {sheet} = this.props;
        const {url} = this.state;

        return(
            <Card className={classes.card}>
                {url &&
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        title="Image title"
                        src={url}
                    />
                }
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {sheet.title}
                    </Typography>
                    <Typography>
                        {sheet.singer}
                    </Typography>
                    <Typography>
                        {sheet.images[0].fileName}
                    </Typography>
                    <Typography>
                        {sheet.remark1}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary"
                        onClick={this.handleView}>
                    View
                    </Button>
                    <Button size="small" color="primary"
                        onClick={this.handleEdit}>
                    Edit
                    </Button>
                </CardActions>
            </Card>
        )
    }
}