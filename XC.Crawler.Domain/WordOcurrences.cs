using System;
using System.Collections.Generic;
using System.Text;

namespace XC.Crawler.Domain
{
    public class WordOcurrences
    {
        public WordOcurrences(string word, int count)
        {
            Word = word;
            Ocurrences = count;
        }

        public string Word { get; set; }
        public int Ocurrences { get; set; }
    }
}
