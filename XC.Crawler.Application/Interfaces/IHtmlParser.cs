using System;
using System.Collections.Generic;
using System.Text;

namespace XC.Crawler.Application.Interfaces
{
    public interface IHtmlParser
    {
        IEnumerable<string> GetImagesLinks(string url);

        string GetText(string url);
    }
}
