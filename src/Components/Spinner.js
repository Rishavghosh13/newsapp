import React from 'react'
import loading from "C:/Users/User/Desktop/ReactCourse/n-app/my-news-app/src/loading.gif"

const Spinner = () => {

    return (
        <div className="text-center">
            <img src={loading} alt="loading" />
        </div>
    )

}

export default Spinner
