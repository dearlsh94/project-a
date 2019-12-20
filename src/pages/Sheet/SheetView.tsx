import React, {Component} from 'react';
import ISheet from '../../models/ISheet';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import TopBar from '../../TopBar';

interface IProps{
    sheet: ISheet
}
interface IStates{
    
}

export default class SheetView extends Component<IProps, IStates>{
    render(){
        const { sheet } = this.props;
        
        return(
            <div>
                <CssBaseline />
                <TopBar
                    barText="Sheet Create"/>
                
            </div>
        );
    }
}