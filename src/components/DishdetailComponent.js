import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'

    function RenderDish({dish}) {
        return( <div className="col-12 col-sm-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>)
    }

    function RenderComments({comments}) {
        if(comments) {
            return( <div className="col-12 col-sm-5 m-1">
                <div className="h4">Comments</div>
                    <ul className="list-unstyled">
                        {comments.map((each) => {
                            return (
                                <li key={each.id}>
                                    <div className="blockquote">{each.comment}</div>
                                    <div className="blockquote-footer"> {each.author}, { new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(each.date)))}</div>
                                    <br/>
                                </li>
                            )})}
                    </ul>
                </div>
            )
        } else {
            return(<div></div>)
        }
    }

    const Dishdetail = (props) => {

        if (props.dish != null) {
            return (
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            { props.dish.name }
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{ props.dish.name }</h3>
                        <hr />
                    </div>

                    <div className="row">
                        <RenderDish dish = { props.dish } />
                        <RenderComments comments = { props.comments } />
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



export default Dishdetail;