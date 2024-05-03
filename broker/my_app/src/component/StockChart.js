import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ChartLine from "./Chart";
import Form from "react-bootstrap/Form";
import {FormCheck} from "react-bootstrap";
import {addStock, delStock, storeStocks} from "../store/storectock";
import {Spinner} from "react-bootstrap";
import './style.css';

export default function StockChart(props){
    const stock = props.stock;
    const [stockChart, setChart] = useState([]);

    useEffect(()=>{
        (async()=>{
            const data = await fetch('http://localhost:4000/getstock' + stock)
                .then(res => res.json())
            setChart(data);
        })()
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateStore = (event) => {
        console.log(event.target.checked);
        if (event.target.checked)
            storeStocks.dispatch(addStock(stock))
        else
            storeStocks.dispatch(delStock(stock))
    }
    const setValue = () => {
        if (storeStocks.getState().includes(stock))
            return true;
        return false;
    }

    if (stockChart[0])
        return (
            <>
                <p>Стартовая цена: {stockChart[0].Open} </p>
                <div className={'d-flex'}>
                    <Button className="btn" size="lg" onClick={handleShow} variant="info"> Показать график </Button>
                    <Form>
                        <FormCheck
                            defaultChecked={setValue()}
                            value={'on'}
                            style={{margin: '10px'}}
                            type='switch'
                            id={stock + 'CB'}
                            label='Добавить в торги'
                            onChange={updateStore}
                        >
                        </FormCheck>
                    </Form>
                </div>
                <Modal dialogClassName="chartDialog" show={show} onHide={handleClose} key={stock}>
                    <Modal.Header closeButton>
                        <Modal.Title>График акций {stock}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChartLine label={stock} data={stockChart}/>
                    </Modal.Body>
                </Modal>
            </>
        );

    return(
      <>
          <Spinner animation="border" variant="dark" />
      </>
    );
}