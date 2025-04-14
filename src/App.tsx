import { useEffect, useState } from 'react'
import './App.css'
import { getNew } from './api/getNew'
import { DisplayNew } from './components/DisplayNew'
import { New } from './classes/New'
import { useSearchParams } from 'react-router-dom'
import { dateToString } from './functions/dateToString'

function App() {
  const [myNew, setMyNew] = useState<New>(new New("", "", "", "", ""));
  const [hd, setHd] = useState(false);
  const [searchParams] = useSearchParams();
  const dateSTR = searchParams.get("date") || undefined;
  const date = dateSTR ? new Date(dateSTR) : undefined;
  const today = new Date();
  const plusDays = (days: number, d: Date | undefined = date) => d ? new Date(d.getTime() + days * 24 * 60 * 60 * 1000) : undefined;
  const sameDay = (d1: Date | undefined, d2: Date | undefined) => d1 && d2 ? d1.getUTCDate() === d2.getUTCDate() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCFullYear() === d2.getUTCFullYear() : true;
  const tomorrow = plusDays(1);
  const yesterday = plusDays(-1) ?? plusDays(-1, today);
  useEffect(() => {
    getNew(date).then(n => {
      setMyNew(n);
      document.title = n.title;
    });
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-between mb-4">
        <a href={`/NASA-news?date=${yesterday && dateToString(yesterday)}`}><button className="text-black dark:text-white">{"<"}</button></a>
        <a href={(tomorrow && !sameDay(tomorrow, today)) ? `/NASA-news?date=${dateToString(tomorrow)}` : "/NASA-news"}><button className="text-black dark:text-white">{">"}</button></a>
      </div>
      <label className="w-full flex justify-end"><input type="checkbox" checked={hd} onChange={e => setHd(e.target.checked)}/> HD</label>
      <DisplayNew myNew={myNew} hd={hd}/>
    </>
  )
}

export default App
