import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class Dishdetail extends Component {

    renderDish(dish) {
        return( <div className="col-12 col-sm-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={this.props.dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>)
    }


    renderComments(comments) {
        if(this.props.dish) {
        return(
            comments.map((each) => {
                return (
                    <li key={each.id}>
                        <div className="blockquote">{each.comment}</div>
                        <div className="blockquote-footer"> {each.author}, { new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(each.date)))}</div>
                        <br/>
                    </li>
                )
            })
        )} else {return(<div></div>)}
    }

    render() {

        if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        {this.renderDish(this.props.dish)}

                        <div className="col-12 col-sm-5 m-1">
                            <div className="h4">Comments</div>
                            <ul className="list-unstyled">
                                {this.renderComments(this.props.dish.comments)}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}


export default Dishdetail;