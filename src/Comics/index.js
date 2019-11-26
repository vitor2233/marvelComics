import React from 'react';
import './index.css';

import { Card, InputGroup, FormControl } from 'react-bootstrap';

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
        /* Tirar comics que não possui imagem */
        const result = data.data.results.filter(x =>
            x.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
        );
        this.setState({ comics: result });
    }



    render() {
        return (
            <div className="Comic">
                <div className="search container">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Year: from, until</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl />
                        <FormControl />
                    </InputGroup>
                </div>
                <div className="comics">
                    {console.log(this.state.comics)}
                    {this.state.comics.map(comic => (
                        <div key={comic.id} className="comicMap">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} />
                                <Card.Body>
                                    <Card.Title>{comic.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}

export default Comic;
