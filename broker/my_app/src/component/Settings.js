import {Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {storeStocks} from "../store/storectock";
import React, {useState} from "react";
import Trade from "./Trade";

export default function Settings(){
    const [tradeStatus, setTradeStatus] = useState(false);
    const [day, setDay] = useState('');
    const onFormSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        formDataObj['stocks'] = storeStocks.getState();
        await fetch('http://localhost:4000/starttrade', {
            method: 'POST',
            headers: { "Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(formDataObj)
        });
        setTradeStatus(true);
    };
    return(
        <>
            <Container>
                <h2 className="hat"> Настройки биржи </h2>
                <Form onSubmit={onFormSubmit}>
                    <Form.Group controlId="start_date">
                        <Form.Label style={{margin: '1em 0 1em 0'}}>Дата начала торгов: </Form.Label>
                        <Form.Control
                            type="date"
                            name="start_date"
                            disabled={tradeStatus}
                            size="lg"
                        />
                    </Form.Group>
                    <Form.Group controlId="Speed">
                        <Form.Label style={{margin: '1em 0 1em 0'}}>Скорость смены дат (с/день): </Form.Label>
                        <Form.Control
                            type="number"
                            name="Speed"
                            defaultValue={2}
                            disabled={tradeStatus}
                            size="lg"
                        />
                    </Form.Group>
                    <Button style={{margin: '1em 0 1em 0'}}
                            variant="outline-danger"
                            type="submit"
                            disabled={tradeStatus}
                            size="lg">
                            
                        Начать торги
                    </Button>
                </Form>
                <h2 style = {{visibility: tradeStatus ? 'visible' : 'hidden'}}>День: {day}</h2>
                <Trade setDay={setDay} setStatus={setTradeStatus}/>
            </Container>
        </>
    );

}