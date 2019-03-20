using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace XC.Crawler.Domain
{
    public class TextParser
    {
        private string[] words;
        private readonly char[] delimiters = new char[] {' ',',','.',';',':','"','?','!','-','|','\n','\r'};

        public TextParser(string text, int listCount = 10)
        {
            words = text.Split(delimiters, StringSplitOptions.RemoveEmptyEntries);

            TotalWordCount = words.Length;

            WordListCount = words.GroupBy(s => s)
                                 .Select(group => new WordOcurrences(group.Key, group.Count()))
                                 .OrderByDescending(group => group.Ocurrences)
                                 .Take(listCount)
                                 .ToList();
        }

        public int TotalWordCount { get; private set; }

        public IEnumerable<WordOcurrences> WordListCount { get; private set; }
    }
}
