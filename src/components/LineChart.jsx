import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto'


const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleString())
    }


    const data = {
        labels: coinTimestamp,
        datasets: [
        {
            label: 'Price In USD',
            data: coinPrice,
            fill: true,
            backgroundColor: 'rgba(0, 113, 189, 0.2)',
            borderColor: 'rgba(0, 113, 189, 1)',
        },
        ],
    };

    const options = {
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
            },
            },
        ],
        },
    };


    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </>
    )
}

export default LineChart
