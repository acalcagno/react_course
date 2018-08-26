import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent'
import CommentForm from './CommentForm'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish}) {
        return( <div className="col-12 col-sm-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>)
    }

    function RenderComments({comments, postComment, dishId}) {
        if(comments) {
            return(
            <div className="col-12 col-sm-5 m-1">
                <div className="h4">Comments</div>
                    <ul className="list-unstyled">
                        <Stagger in>
                        {comments.map((each) => {
                            return (
                                <Fade in>
                                    <li key={each.id}>
                                        <div className="blockquote">{each.comment}</div>
                                        <div className="blockquote-footer"> {each.author}, { new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(each.date)))}</div>
                                        <br/>
                                    </li>
                                </Fade>
                        )})}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            )
        } else {
            return(<div><CommentForm/></div>)
        }
    }

    const Dishdetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        } else if (props.dish != null) {
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
                        <RenderComments comments = { props.comments }
                        postComment={props.postComment}
                        dishId={props.dish.id}
                        />
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