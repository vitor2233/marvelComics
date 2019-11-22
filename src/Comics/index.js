import React from 'react';
import './index.css';

class Comic extends React.Component {
    state = {
        comics: [],
    }

    componentDidMount() {
        this.fetchComics();
    }

    async fetchComics() {
        const url = 'https://gateway.marvel.com:443/v1/public/comics?dateRange=1960-01-01%2C1970-01-01&apikey=42b5095143efb46a0176cbb70e28b104&ts=0&hash=0441ba8faeb7dfffb305b57ef0596500';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ comics: data.data.results });
    }



    render() {
        return (
            <div className="Comic">
                <div className="comics">
                    {console.log(this.state.comics)}
                    {this.state.comics.map(comic => (
                        <div key={comic.id} className="comicMap">
                            <p>{comic.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

export default Comic;
