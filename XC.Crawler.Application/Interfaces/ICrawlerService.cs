using System;
using System.Collections.Generic;
using System.Text;
using XC.Crawler.Application.DTO;

namespace XC.Crawler.Application.Interfaces
{
    public interface ICrawlerService
    {
        CrawlerDTO LoadUrl(string url);
    }
}
