// src/components/Language.jsx
import React, { useState, useEffect } from 'react';

const Language = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch available languages from API
  const fetchLanguages = async () => {
    const url = 'https://ai-translate.p.rapidapi.com/languages';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'be034a6df3msh0c9ad16f8675797p121524jsn14b1f130748b',
        'x-rapidapi-host': 'ai-translate.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.languages) {
        setLanguages(result.languages);
      } else {
        setError('Unexpected response structure from API.');
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
      setError('Error fetching languages: ' + error.message);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Handle translation request to the selected language
  const handleTranslate = async () => {
    if (!selectedLanguage || !textToTranslate) {
      setError('Please select a language and enter text to translate.');
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    setTranslatedText(''); // Clear previous translation

    const url = 'https://ai-translate.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-key': 'be034a6df3msh0c9ad16f8675797p121524jsn14b1f130748b',
        'x-rapidapi-host': 'ai-translate.p.rapidapi.com',
      },
      body: JSON.stringify({
        q: textToTranslate,
        target: selectedLanguage,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // Debugging: Check the structure of the result

      if (result && result.translatedText) {
        setTranslatedText(result.translatedText);
      } else {
        setError('Unexpected response structure from API.');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setError('Error translating text: ' + error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Text Translator</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* Input for text to translate */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          placeholder="Enter text to translate..."
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        />
      </div>

      {/* Dropdown for selecting language */}
      <div className="mb-4">
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      {/* Button to trigger translation */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleTranslate}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {/* Display translated text */}
      {translatedText && (
        <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
          <h3 className="font-bold mb-2">Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Language;
