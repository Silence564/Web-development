import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import StockChart from "./StockChart";

export default function Stock(){
    const [stocks, setStocks] = useState([]);

    useEffect(()=>{
        (async()=>{
            const data = await fetch('http://localhost:4000/stock')
                .then(res => res.json())
            setStocks(data);
        })()
    }, []);
    return (
      <>
          {stocks.map((item) => (
              <Card key = {item.id}>
                  <Card.Body>
                      <Card.Title className="text">{item.company_name} ({item.Symbol})</Card.Title>
                      <StockChart stock={item.Symbol}/>
                  </Card.Body>
              </Card>
          ))}
      </>
    );
}