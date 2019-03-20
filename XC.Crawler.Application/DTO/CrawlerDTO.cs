using System;
using System.Collections.Generic;
using System.Text;
using XC.Crawler.Domain;

namespace XC.Crawler.Application.DTO
{
    public class CrawlerDTO
    {
        public CrawlerDTO(IEnumerable<string> images, int wordCount, IEnumerable<WordOcurrences> wordOcurrences)
        {
            Images = images;
            WordCount = wordCount;
            WordOcurrences = wordOcurrences;
        }

        public IEnumerable<string> Images { get; set; }
        public int WordCount { get; set; }
        public IEnumerable<WordOcurrences> WordOcurrences { get; set; }
    }
}
