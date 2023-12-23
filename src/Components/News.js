import React, { useEffect, useLayoutEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setarticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [Totalresults, setTotalresults] = useState(0)



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `JhanduNews-${capitalizeFirstLetter(props.category)}`
    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&${props.page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(38)
        let parsedData = await data.json()
        props.setProgress(70)
        console.log(parsedData);
        setarticles(parsedData.articles)
        setTotalresults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews()
    }, [])


    const fetchData = async () => {
        setPage((prevPage) => prevPage + 1);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        setarticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
        setTotalresults(parsedData.totalResults);
        setLoading(false);
        setPage((prevPage) => prevPage);
    };



    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop:'90px'}}>JhanduNews - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchData} 
                hasMore={articles.length !== Totalresults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>

    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
