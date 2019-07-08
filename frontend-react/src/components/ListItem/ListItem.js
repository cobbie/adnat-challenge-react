import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import Button from '../Button/Button';


const ListItem = props => {
    return(
        <ListGroup.Item>
        <Row>
            <Col>
            {props.itemText}
            </Col>
            <Col>
            <Button variant='link' onClick={props.onClickJoin}>Join</Button>
            <Button variant='link' onClick={props.onClickEdit}>Edit</Button>
            </Col>
        </Row>
        </ListGroup.Item>
    )
}

export default ListItem;