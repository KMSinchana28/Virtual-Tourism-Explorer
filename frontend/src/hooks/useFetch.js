
import { useState, useEffect } from 'react';

const useFetch = (url) => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         setError(null);

         try {
            const res = await fetch(url);

            if (!res.ok) {
               throw new Error('Failed to fetch tour details');
            }

            const result = await res.json();

            if (!result.success) {
               throw new Error(result.message || 'Something went wrong');
            }

            setData(result.data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [url]);

   return {
      data,
      error,
      loading
   };
};

export default useFetch;
