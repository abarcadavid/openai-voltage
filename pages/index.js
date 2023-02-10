import Head from 'next/head';
import {useState} from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userInput})
      });

      const data = await response.json();
      const {output} = data;

      setApiOutput(`${output.text}`);
      setIsGenerating(false);

    } catch(error) {
      setIsGenerating(false);
      return new Error('Something when wrong calling endpoint!')
    }
  }

  const onUserChangedText = (e) => {
    console.log(e.target.value);
    setUserInput(e.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>VoltageAI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Antonio's high power microwave assistant</h2>
          </div>
        </div>
        <div className='prompt-container'>
          <textarea
            placeholder="start typing here"
            className='prompt-box'
            value={userInput}
            onChange={(e) => onUserChangedText(e)}/>
          <div className='prompt-buttons'>
            <a className={isGenerating ?
              'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}>
              <div className='generate'>
                {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
        </div>
        {apiOutput && (
          <div className='output'>
            <div className='output-header-container'>
              <div className='output-header'>
                <h3>Output</h3>
              </div>
            </div>
            <div className='output-content'>
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
