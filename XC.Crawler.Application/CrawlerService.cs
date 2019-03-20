using System;
using XC.Crawler.Application.DTO;
using XC.Crawler.Application.Interfaces;
using XC.Crawler.Domain;

namespace XC.Crawler.Application
{
    public class CrawlerService : ICrawlerService
    {
        private readonly IHtmlParser _htmlParser;

        public CrawlerService(IHtmlParser htmlParser)
        {
            _htmlParser = htmlParser;
        }

        public CrawlerDTO LoadUrl(string url)
        {
            var images = _htmlParser.GetImagesLinks(url);

            var text = _htmlParser.GetText(url);
            var results = new TextParser(text);
            
            var dto = new CrawlerDTO(images, results.TotalWordCount, results.WordListCount);

            return dto;
        }
    }
}
