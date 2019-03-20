using NUnit.Framework;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using XC.Crawler.Domain;

namespace Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void UniqueWordCountIsCorrect()
        {
            var uglyText = "the   dog, chases the cat ;that chases the mouse :that chases! \r\n the elephant that chases? the dog.";
            var crawler = new TextParser(uglyText, 10);

            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "the").Select(i => i.Ocurrences).FirstOrDefault(), 5);
            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "dog").Select(i => i.Ocurrences).FirstOrDefault(), 2);
            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "chases").Select(i => i.Ocurrences).FirstOrDefault(), 4);
            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "cat").Select(i => i.Ocurrences).FirstOrDefault(), 1);
            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "that").Select(i => i.Ocurrences).FirstOrDefault(), 3);
            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "mouse").Select(i => i.Ocurrences).FirstOrDefault(), 1);
            Assert.AreEqual(crawler.WordListCount.Where(w => w.Word == "elephant").Select(i => i.Ocurrences).FirstOrDefault(), 1);
        }

        [Test]
        public void TotalWordCountMatchesTotalUniqueWordCount()
        {
            var uglyText = "the   dog, chases the cat ;that chases the mouse :that chases!!  \r\n the elephant that chases? the dog.";
            var crawler = new TextParser(uglyText, 10);
            Assert.AreEqual(crawler.TotalWordCount, crawler.WordListCount.Sum(w => w.Ocurrences));
        }
    }
}