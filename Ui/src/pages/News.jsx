import React, { useState, useEffect } from 'react';

const NewsPage = () => {
  const [whatsNew, setWhatsNew] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated pre-fetched data for "What's New" section
    const preFetchedWhatsNew = [
      {
        title: 'India’s Coal Production Hits Record High',
        description: 'India’s coal production has reached an all-time high, ensuring energy security and boosting the economy.',
        urlToImage: 'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        url: 'https://example.com/sustainable-mining'
      },
      {
        title: 'Sustainable Mining Practices Adopted by Coal India',
        description: 'Coal India has adopted new sustainable mining practices to reduce environmental impact while increasing efficiency.',
        urlToImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?fit=crop&w=400&h=200&q=80',
        url: 'https://example.com/sustainable-mining'
      },
      {
        title: 'Coal Sector Contributes to India’s Renewable Transition',
        description: 'The coal sector is contributing to India’s renewable energy transition by integrating clean energy solutions into operations.',
        urlToImage: 'https://images.pexels.com/photos/374872/pexels-photo-374872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        url: 'https://example.com/coal-renewable-transition'
      }
    ];

    // Simulated pre-fetched data for "Press Releases" section
    const preFetchedPressReleases = [
      {
        title: 'Ministry of Coal Announces New Policy for Sustainable Mining',
        description: 'A new policy has been introduced to promote sustainable mining practices across India.',
        urlToImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        url: 'https://example.com/new-coal-policy'
      },
      {
        title: 'Coal India Launches Clean Coal Technology Initiative',
        description: 'Coal India has launched an initiative to explore clean coal technologies that aim to reduce emissions.',
        urlToImage: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        url: 'https://example.com/clean-coal-initiative'
      },
      {
        title: 'Government Pushes for Greater Transparency in Coal Mining',
        description: 'The government has announced measures to improve transparency and efficiency in the coal mining sector.',
        urlToImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?fit=crop&w=400&h=200&q=80',
        url: 'https://example.com/transparency-coal-mining'
      }
    ];

    // Set the state with pre-fetched data
    setWhatsNew(preFetchedWhatsNew);
    setPressReleases(preFetchedPressReleases);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-8 mb-12 mt-12 font-roboto">
      {/* Header Section */}
      <header className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-black">
            News & Press Releases - <span className="text-[#D4B030]">Ministry of Coal</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Stay updated with the latest news and press releases from the Ministry of Coal.
          </p>
        </div>
      </header>

      {/* What's New Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
          What's New
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatsNew.map((newsItem, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <img src={newsItem.urlToImage} alt="news" className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{newsItem.title}</h3>
              <p className="text-sm text-gray-600">{newsItem.description}</p>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-4 inline-block">
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Press Release Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
          Press Releases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressReleases.map((release, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <img src={release.urlToImage} alt="press release" className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{release.title}</h3>
              <p className="text-sm text-gray-600">{release.description}</p>
              <a href={release.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-4 inline-block">
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Twitter Feed Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">
          Latest Tweets from Ministry of Coal
        </h2>
        {/* Twitter Embed Code */}
        <div className="flex justify-center">
          <a
            className="twitter-timeline"
            data-theme="light"
            href="https://twitter.com/CoalMinistry?ref_src=twsrc%5Etfw"
          >
            Tweets by Ministry of Coal
          </a>
        </div>
      </div>

      {/* Twitter Script */}
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  );
};

export default NewsPage;
