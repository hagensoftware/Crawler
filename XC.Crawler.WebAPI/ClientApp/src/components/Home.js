import React, { Component } from 'react';
import { Carousel } from './Carousel';
import { Bar } from 'react-chartjs-2';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { crawlResults: [] };

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
            <Carousel urls={crawlResults.images} />
        );
    }

    static renderCrawlResultsTable(crawlResults) {

        if (crawlResults.length == 0) return;

        var labelArray = [];
        var dataArray = [];
        let wordOcurrences = crawlResults.wordOcurrences;
        for (var i = 0; i < wordOcurrences.length; i++) {
            labelArray.push(wordOcurrences[i].word);
            dataArray.push(wordOcurrences[i].ocurrences);
        }

        const data = {
            labels: labelArray,
            datasets: [
                {
                    label: 'WordCount',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: dataArray
                }
            ]
        };

        return (
            <div>
                <h2>Bar Chart Example</h2>
                <Bar data={data} />
            </div>
        );
    }


  render () {
      let wordCount = this.state.loading
          ? <p><em>Loading...</em></p>
          : Home.renderCrawlWordCount(this.state.crawlResults);

      let images = this.state.loading
          ? <p><em>Loading...</em></p>
          : Home.renderCrawlImages(this.state.crawlResults);

      let contents = this.state.loading
          ? <p><em>Loading...</em></p>
          : Home.renderCrawlResultsTable(this.state.crawlResults);

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
