using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using XC.Crawler.Application.Interfaces;
using System.Net;
using System.Globalization;

namespace XC.Crawler.Infrastructure
{
    public class HtmlParser : IHtmlParser
    {
        public IEnumerable<string> GetImagesLinks(string url)
        {
            HtmlDocument document = GetHtmlDocument(url);
            var urls = document.DocumentNode.Descendants("img")
                                            .Select(e => e.GetAttributeValue("src", null))
                                            .Where(s => !String.IsNullOrEmpty(s));

            List<string> validImages = CheckImages(urls);

            return validImages;
        }

        public string GetText(string url)
        {
            StringBuilder sb = new StringBuilder();
            try
            { 
                var nodes = new HtmlWeb().Load(url).DocumentNode.Descendants().Where(n =>
                n.NodeType == HtmlNodeType.Text &&
                n.ParentNode.Name != "script" &&
                n.ParentNode.Name != "style");

                foreach (HtmlNode node in nodes)
                    sb.AppendJoin(' ', node.InnerText);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Please verify Url. " + ex.Message);
            }

            return sb.ToString();
        }

        private static HtmlDocument GetHtmlDocument(string url)
        {
            HtmlDocument document;
            try
            {
                document = new HtmlWeb().Load(url);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Please verify Url. " + ex.Message);
            }

            return document;
        }

        private bool IsImageUrl(string Url)
        {
            try
            {
                var request = (HttpWebRequest)HttpWebRequest.Create(Url);
                request.Method = "HEAD";
                using (var response = request.GetResponse())
                {
                    var length = response.ContentLength;
                    return (length > 50 && response.ContentType.ToLower(CultureInfo.InvariantCulture).StartsWith("image/"));
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        private List<string> CheckImages(IEnumerable<string> urls)
        {
            List<string> validImages = new List<string>();
            foreach (var imageUrl in urls)
            {
                if (IsImageUrl(imageUrl))
                    validImages.Add(imageUrl);
            }

            return validImages;
        }
    }
}
