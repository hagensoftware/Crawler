using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using XC.Crawler.Application;
using XC.Crawler.Application.DTO;
using XC.Crawler.Application.Interfaces;

namespace XC.Crawler.WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class CrawlerController : Controller
    {
        private readonly ICrawlerService _crawlerService;

        public CrawlerController(ICrawlerService crawlerService)
        {
            _crawlerService = crawlerService;
        }

        [HttpPost("[action]")]
        public CrawlerDTO LoadUrl(string url)
        {
            var dto = _crawlerService.LoadUrl(url);
            return dto;
        }
    }
}