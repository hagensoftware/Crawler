import React, { Component } from 'react';

export class Crawler extends Component {
    static displayName = Crawler.name;

    constructor(props) {
        super(props);
        this.state = { crawlResults: [], loading: true };

        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //let data = {
        //    name: 'www.google.com'
        //}
        //// The parameters we are gonna pass to the fetch function
        //let fetchData = {
        //    method: 'POST',
        //    body: data,
        //    headers: new Headers()
        //}

        //fetch('api/Crawler/LoadUrl')
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ crawlResults: data, loading: false });
        //    });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        //this.state = { crawlResults: [] };

        fetch('api/Crawler/LoadUrl', {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ crawlResults: data, loading: false });
        });

        //let contents = this.state.loading
        //    ? <p><em>Loading...</em></p>
        //    : Crawler.renderCrawlResultsTable(this.state.crawlResults);
    }

    static renderCrawlWordCount(crawlResults) {
        return (
            <div>Word Count: {crawlResults.wordCount}</div>
            )
    }

    static renderCrawlImages(crawlResults) {
        return (
            //<div>Word Count: {crawlResults.wordCount}</div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Images</th>
                    </tr>
                </thead>
                <tbody>
                    {crawlResults.images.map(crawl =>
                        <tr key={crawl}>
                            <td>{crawl}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderCrawlResultsTable(crawlResults) {
        return (
            //<div>Word Count: {crawlResults.wordCount}</div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {crawlResults.wordOcurrences.map(crawl =>
                        <tr key={crawl.word}>
                            <td>{crawl.word}</td>
                            <td>{crawl.ocurrences}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let wordCount = this.state.loading
            ? <p><em>Loading...</em></p>
            : Crawler.renderCrawlWordCount(this.state.crawlResults);

        let images = this.state.loading
            ? <p><em>Loading...</em></p>
            : Crawler.renderCrawlImages(this.state.crawlResults);

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Crawler.renderCrawlResultsTable(this.state.crawlResults);

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Url: 
                    <input type="text" name="url" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <h1>Crawl results</h1>
                <p>This component demonstrates fetching data from the server.</p>
                
                {wordCount}
                {images}
                {contents}
            </div>
        );
    }
}
