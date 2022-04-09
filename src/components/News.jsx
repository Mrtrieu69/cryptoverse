import React, { useEffect, useRef, useState } from 'react';
import { Typography, Row, Col, Card, Input } from 'antd';
import moment from 'moment';
import axios from "axios"

import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory ] = useState("crypto") 
  const [cryptoNews, setCryptoNews] = useState([])
  const [page, setPage] = useState(1)
  const searchEl = useRef()

  const page_size = simplified ? 6 : 12
  const totalNews = 25


  const handleClick = () => {
    getNews()
  }

  const handlePagination = (payload) => {
    if(payload === "prev"){
      if(page === 1) return
      setPage(page - 1)
    }else if(payload === "next"){
      if(page === Math.ceil(totalNews / page_size)) return
      setPage(page + 1)
    }else{
      setPage(payload)
    }
    searchEl.current.input.scrollIntoView({block: "center", behavior: "smooth"})
  }

  const getNews = async () => {
    try{
      const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: {q: newsCategory, lang: 'en', page, page_size},
        headers: {
          'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
          'X-RapidAPI-Key': 'a25b586c68msha01e03173be9f5bp1ad25ejsne60497c0da8c'
        }
      };
      
      const data = await axios.request(options)
      setCryptoNews(data?.data)

    }catch{
      console.log("Invalid data")
    }
  }

  useEffect(() => {
    getNews()
  }, [page, newsCategory])



  if(!cryptoNews?.articles) return <Loader />


  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <div className="search-crypto">
            <Input.Search
              ref={searchEl}
              placeholder="Search news..."
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={(value) => setNewsCategory(value)}
            />
          </div>
        </Col>
      )}
      {cryptoNews.articles.map((news, i) => (
        <Col onClick={handleClick} xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title.length > 70 ? `${news.title.substring(0, 70)}...` : news.title}</Title>
                <img src={news?.media || demoImage} alt="" />
              </div>
              <p>{news.summary.length > 125 ? `${news.summary.substring(0, 125)}...` : news.summary}</p>
              <div className="provider-container">
                <Text className='provider-news'>{moment(news.published_date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      {!simplified &&
        <div className="pagination">
          <button 
            className={`page ${page === 1 && "disable"}`}
            onClick={() => handlePagination("prev")}
          >
            Prev
          </button>
          {
            new Array(Math.ceil(totalNews / page_size)).fill().map((_, i) =>
              <span 
                className={`page ${page === i + 1 && 'active'}`} 
                key={i}
                onClick={() => handlePagination(i+1)}
              >
                {i+1}
              </span>)
          }
          <button 
            className={`page ${page === Math.ceil(totalNews / page_size) && "disable"}`}
            onClick={() => handlePagination("next")}
          >
            Next</button>
        </div>
      }
    </Row>
  )
}

export default News
