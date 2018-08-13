import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'


const maxLenght = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length > len)

class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState( {
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <React.Fragment>
                <Button outline color="info" onClick={this.toggleModal} >
                    <span className="fa fa-pencil" /> Submit Comment
                </Button>
                <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                                    className="form-control"
                                                    innerRef={(input) => this.rating = input }>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author" >Your Name</Label>
                                    <Control.text className="form-control"
                                                  model=".author" id="author" name="author" placeHolder="Your Name"
                                                  innerRef={(input) => this.author = input }
                                                  validators={{
                                                      minLength: minLength(2), maxLength: maxLenght(15)
                                                  }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="6"
                                                      className="form-control"
                                                      innerRef={(input) => this.comment = input }/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}



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

    function RenderComments({comments, addComment, dishId}) {
        if(comments) {
            return(
            <div className="col-12 col-sm-5 m-1">
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
                    <CommentForm dishId={dishId} addComment={addComment}/>
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
                        addComment={props.addComment}
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