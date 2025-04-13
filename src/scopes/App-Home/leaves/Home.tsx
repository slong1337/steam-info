import { useLoaderData } from '@remix-run/react'
import { clientLoader } from '@/scopes/App-Home/leaves/Home.loader'
import { useState } from 'react'


type Game = {
    appid: number
    name: string
    playtime_forever: number
    playtime_2weeks: number
    img_icon_url: string
  }

  const steamImageBaseUrl = 'http://media.steampowered.com/steamcommunity/public/images/apps/'

    function sumPlaytimeForever(games: Game[]):number {
    let totalMinutes = 0

    for (const game of games) {
        totalMinutes += game.playtime_forever
    }

    const totalHours = totalMinutes / 60

    return parseFloat(totalHours.toFixed())
}

function sumPlaytime2Weeks(games: Game[]):number {
    let totalMinutes = 0

    for (const game of games) {
        if (!isNaN(game.playtime_2weeks)) {
            totalMinutes += game.playtime_2weeks
          } else {
          } }

    const totalHours2Week = totalMinutes / 60

    return !isNaN(totalHours2Week) ? parseFloat(totalHours2Week.toFixed(1)) : 0
}

const sortGamesByPlaytime = (games: Game[]) => {
    return games.sort((a, b) => b.playtime_forever - a.playtime_forever);
  };

export function Home() {

    const games = useLoaderData<Game[]>()
    const totalHours = sumPlaytimeForever(games)
    const totalHours2Week = sumPlaytime2Weeks(games)
    const sortedGames = sortGamesByPlaytime(games)
    const [steamID, setSteamID] = useState('')


  return (
    <>
        <div className='px-4'>
            <div className='flex items-center '>

                <textarea 
                    className='bg-slate-100 outline rounded-sm outline-slate-500 w-[320px] h-[50px] items-center my-2'
                    placeholder='Введите свой SteamID'
                    onChange={(e) => setSteamID(e.target.value)}>  
                </textarea>

                <button 
                    className='mx-4 outline rounded-sm outline-offset-2 outline-slate-500'
                    onClick={() => console.log(steamID)}
                    >Поиск
                </button>
            </div>

            <div style={{ padding: '1rem' }}>
                <h1>Игры в Steam</h1>
                    <div>

                        <button    
                        onClick={() => console.log(games)}>
                            Вывести в консоль
                        </button>

                        <p>Всего игр: {games.length}</p>

                        <p>Потрачено часов жизни на игры: {totalHours} ч</p>

                        <p>За последние 2 недели: {totalHours2Week} ч</p>

                    </div>

                <div className='flex'>

                    <ul>
                        {sortedGames.map(game => (
                        <div 
                        className='flex items-center mb-2'
                        key={game.appid}>
                            <img 
                                src={`${steamImageBaseUrl}${game.appid}/${game.img_icon_url}.jpg`} 
                                alt={game.name} 
                                className='w-6 h-6 mr-4'
                            />
                            <h1>{game.name}</h1> — {(game.playtime_forever / 60).toFixed(1)} ч
                        </div>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    </>
  )
}
