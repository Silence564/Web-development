import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import  Carousel  from "react-bootstrap/Carousel";
import App1 from "../soket";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import "./style.css";

function AddDialog(props){
    const onFormSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        await fetch('http://localhost:4000/addbroker', {
            method: 'POST',
            headers: { "Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(formDataObj)
        });
    };
    return (
      <>
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Добавить брокера</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onFormSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Название</Form.Label>
                            <Form.Control name = 'name' type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="money">
                            <Form.Label>Начальная сумма</Form.Label>
                            <Form.Control name = 'money' type="number"/>
                        </Form.Group>
                        <Button type="submit" onClick={props.onHide} size="lg">Добавить</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
}

function EditDialog(props){    
    const form = async(e) =>{
        e.preventDefault();
        const form_data = new FormData(e.target);
        const form_data_obj = Object.fromEntries(form_data.entries());
        await fetch('http://localhost:4000/editbroker'+props.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(form_data_obj)
        });
    };
    return(
        <div>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Редактирование брокера</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={form}>
                        <Form.Group controlId="name">
                            <Form.Label>Название</Form.Label>
                            <Form.Control defaultValue={props.name} name='name' type="text"/>
                        </Form.Group>
                        <Form.Group controlId="money">
                            <Form.Label>Сумма</Form.Label>
                            <Form.Control defaultValue={props.money} name='money' type="number"/>
                        </Form.Group>
                        <Button type="submit" onClick={props.onHide} size="lg">Сохранить</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default function Brokers(){
    const [allbroker, setbroker] = useState('');
    const [update, set] = useState(false);
    const [show, set_show] = useState(false); 
    const [show1, set_show1] = useState(false);
    useEffect(()=>{
        (async()=>{
            const data = await fetch('http://localhost:4000/brokers')
                .then(res => res.json())
            setbroker(data);
            set(false)
        })()
    }, [update]);

    const delBroker = async(e) => {
        await fetch('http://localhost:4000/delbroker'+e.target.value, {method: 'DELETE'});
    };

    if(allbroker !== ''){
        return(
            <div>
                <Carousel data-bs-theme="dark">
                    <Carousel.Item key= '-1'>
                        <img
                            src='img/6.jpg'
                        />
                        <Carousel.Caption>
                            <App1 events={['newBroker']} updateCalls={[set]}/>
                            <Button className="btn11" onClick={() => set_show1(true)} variant="outline-dark" size="lg">Добавить брокера</Button>
                            <AddDialog 
                                show={show1}
                                onHide={() => set_show1(false)}
                            />
                        </Carousel.Caption>  
                    </Carousel.Item>
                    {allbroker.map((item) =>(
                        <Carousel.Item key={item.id} >
                            <img
                                className="d-block w-100"
                                src={`../img/${item.photo}.jpg`}
                            />
                            <Carousel.Caption>
                                <h5>{item.name}</h5>
                                <p>Сумма денег: {item['money']}</p>
                                <div className="buttons">
                                    <Button variant="outline-primary" size="lg" onClick={() => set_show(true)}>Изменить</Button>

                                    <EditDialog id={item.id} name={item.name} money={item['money']}
                                        show={show}
                                        onHide={() => set_show(false)}
                                    />
                                    <Button variant="outline-danger" size="lg" value={item.id} onClick={delBroker} className="knop1">Удалить</Button>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
    return(
        <div>
            <Spinner animation="border" variant="dark" />
        </div>
    );
}