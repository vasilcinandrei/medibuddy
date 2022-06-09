import { useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
const useFetch = (url) => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const theToken = auth?.token;


  useEffect(() => {
    const abortCont = new AbortController();


    setTimeout(() => {
      fetch(url, {

        signal: abortCont.signal,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Private-Network': true,
          'Authorization': `Token ${theToken}`

        }
      })
        .then(res => {
          if (!res.ok) { // error coming back from server
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            setIsPending(false);
            setError(err.message);
          }

        })
    }, 0);

    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}

export default useFetch;