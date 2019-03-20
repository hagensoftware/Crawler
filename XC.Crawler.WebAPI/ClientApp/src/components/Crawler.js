import React, { Component } from 'react';

export class Crawler extends Component {
    static displayName = Crawler.name;

    constructor(props) {
        super(props);
        this.state = { crawlResults: []};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        this.setState({ crawlResults: data, loading: true });

        fetch('api/Crawler/LoadUrl', {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ crawlResults: data, loading: false });
        });
    }

    static renderCrawlWordCount(crawlResults) {
        if (crawlResults.length == 0) return;
        return (
            <div>Word Count: {crawlResults.wordCount}</div>
            )
    }

    static renderCrawlImages(crawlResults) {
        if (crawlResults.length == 0) return;
        return (
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
        if (crawlResults.length == 0) return;
        return (
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
                {wordCount}
                {images}
                {contents}
            </div>
        );
    }
}
