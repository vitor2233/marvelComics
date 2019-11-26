import React from 'react';
import './index.css';

import { Card, InputGroup, Button, FormControl } from 'react-bootstrap';

class Comic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comics: [],
            year1: 1960,
            year2: 1964,
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    componentDidMount() {
        this.fetchComics();
    }

    async fetchComics() {
        const url = 'https://gateway.marvel.com:443/v1/public/comics?dateRange=' + this.state.year1 + '-01-01%2C' + this.state.year2 + '-01-01&apikey=42b5095143efb46a0176cbb70e28b104&ts=0&hash=0441ba8faeb7dfffb305b57ef0596500';
        const response = await fetch(url);
        const data = await response.json();
        /* Tirar comics que não possui imagem */
        const result = data.data.results.filter(x =>
            x.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
        );
        this.setState({ comics: result });
    }

    handleChange1(event) {
        this.setState({ year1: event.target.value });
    }
    handleChange2(event) {
        this.setState({ year2: event.target.value });
    }

    updateYear = e => {
        e.preventDefault();
        this.fetchComics();
    }

    render() {
        return (
            <div className="Comic">
                <div className="search container">
                    <form onSubmit={this.updateYear}>
                        <InputGroup className="group">
                            <FormControl onChange={this.handleChange1} value={this.state.year1} />
                            <FormControl onChange={this.handleChange2} value={this.state.year2} />
                            <InputGroup.Prepend>
                                <Button type="submit" variant="outline-secondary">Change</Button>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </form>
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
