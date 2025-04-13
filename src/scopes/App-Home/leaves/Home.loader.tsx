import { json } from '@remix-run/node'
import { ClientLoaderFunctionArgs } from '@remix-run/server-runtime/dist/routeModules'
export {Home} from '@/scopes/App-Home/leaves/Home'

const apiKey = import.meta.env.API_KEY as string
const steamID = import.meta.env.STEAM_ID as string
// steam_id_ref  76561198139457323  76561198346715820  76561198199024739
// export async function clientLoader() {
//     const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${API_KEY}&steamid=${STEAM_ID}&include_played_free_games=1&include_appinfo=1&format=json`
  
//     const response = await fetch(url)
//     const data = await response.json()
    
//     const games = data?.response?.games || []
//     return json(games)
//   }
import { LoaderFunctionArgs,  } from '@remix-run/node'


export const clientLoader = async ({ request }: LoaderFunctionArgs) => {
    const baseUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamID}&include_played_free_games=1&include_appinfo=1&format=json`
  
    const res = await fetch(baseUrl, {
      headers: { 'Accept': 'application/json' }
    })
  
    const data = await res.json()
    const games = data?.response?.games || []
  
    return json(games)
  }