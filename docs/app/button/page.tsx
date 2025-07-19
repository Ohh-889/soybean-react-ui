'use client';

import FlexSearch from 'flexsearch';
import React, { useEffect, useState } from 'react';

function Page() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const loadIndex = async () => {
      const raw = await fetch('/flexsearch-index.json').then(res => res.json());

      const index = new FlexSearch.Document({
        document: {
          id: 'id',
          index: [
            { field: 'title', tokenize: 'forward' },
            { field: 'content', tokenize: 'forward' }
          ]
        }
      });

      raw.forEach((doc: any) => index.add(doc));

      const n = index.search('b');

      setResults(n.flatMap((res: any) => res.result));

      console.log(n);
    };
    loadIndex();
  }, []);

  return (
    <>
      <h1>Button</h1>
      <h2>Button Demo</h2>
      {results.map(result => (
        <div key={result}>
          <h3>{result}</h3>
        </div>
      ))}
    </>
  );
}

export default Page;
