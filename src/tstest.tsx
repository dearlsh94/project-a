import React from "react";

interface IProps {
    name: string
    email: string
}

interface IState {
    age: number
}

export default class TestComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    
    render() {
        return (
            <div>
                test
            </div>
        )
    }
}