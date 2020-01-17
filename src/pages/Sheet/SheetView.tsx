import React, {Component} from 'react';

import ISheet from '../../models/ISheet';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import TopBar from '../../TopBar';
import SheetImgPreview from '../../components/SheetImgPreview';

import { getSheetByKey } from '../../shared/Firebase';

const styles: any = {
    content: {
        width: '100%',
        textAlign: 'center' as 'center',
      },
  };

interface IProps {
    classes: any,
    match: any,
}
interface IStates {
    key: string,
    sheet: ISheet | null,
    isLoaddedImg: boolean,
    isSlideMode: boolean,
}

class SheetView extends Component<IProps, IStates>{

    constructor(props: IProps) {
        super(props);

        if (this.props.match) {
            this.state = {
                key: this.props.match.params.key,
                sheet: null,
                isLoaddedImg: false,
                isSlideMode: true,
            }
        }
        else {
            this.state = {
                key: '',
                sheet: null,
                isLoaddedImg: false,
                isSlideMode: true,
            }
        }
    }

    componentDidMount(){
        if (this.state.key !== '') {
            getSheetByKey(this.state.key)
                .then((datas: any) => {
                    const _sheet: ISheet = {
                        key: datas.key,
                        idx: datas.idx,
                        title: datas.title,
                        subTitle: datas.subTitle,
                        singer: datas.singer,
                        images: datas.images,
                        remark1: datas.remark1,
                        refPath: datas.refPath,
                        tags: datas.tags,
                        metadata: datas.metadata,
                    }

                    this.setState({
                        sheet: _sheet,
                        isLoaddedImg: true,
                    });
                });
        }
    }

    handleModeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isSlideMode: e.target.checked,
        });
    };

    render(){
        const { classes } = this.props;
        const { sheet, isSlideMode, isLoaddedImg } = this.state;

        return(
            <div>
                <TopBar
                    barText="Sheet View"/>
                {sheet ? 
                    <div className={classes.content}>
                        <Typography>Key : {sheet.key}</Typography>
                        <Typography>Title : {sheet.title}</Typography>
                        <Typography>SubTitle : {sheet.subTitle}</Typography>
                        <Typography>Singer : {sheet.singer}</Typography>
                        <Typography>Remark1 : {sheet.remark1}</Typography>
                        <Typography>Reference Path : {sheet.refPath} <a href={sheet.refPath} target="_blank" rel="noopener noreferrer">> move</a></Typography>
                        <SheetImgPreview
                            imgs={sheet.images}>
                        </SheetImgPreview>
                    </div>
                    : <CircularProgress/>
                }
            </div>
        );
    }
}

export default withStyles(styles)(SheetView);