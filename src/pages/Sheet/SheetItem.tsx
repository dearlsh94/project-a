import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ISheet from '../../models/ISheet';

const classes: any = makeStyles(theme => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

interface IProps{
    sheet: ISheet
}

interface IStates{
}

export default class SheetItem extends Component<IProps, IStates> {

    handleView = () => {
        console.log(this.props.sheet.title + " View");        
    }

    handleEdit = () => {
        console.log(this.props.sheet.title + " Edit");    
    }

    render(){
        const {sheet} = this.props;

        return(
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://material-ui.com/static/images/material-ui-logo.svg"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {sheet.title}
                    </Typography>
                    <Typography>
                        {sheet.subTitle}
                    </Typography>
                    <Typography>
                        {sheet.imageName}
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