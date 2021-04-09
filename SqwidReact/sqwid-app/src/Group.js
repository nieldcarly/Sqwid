import React,{Component} from 'react';

export class Group extends Component {

    constructor(props) {
        super(props);
        this.state={groups:[]}
    }
    render() {
        return(
            <div className="mt-5 d-flex justify-content">
                This is Group page.
            </div>
        )
    }
}