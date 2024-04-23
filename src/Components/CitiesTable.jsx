import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import backgroundvideo from '../assets/images/backgroundvideo.mp4'
import InfiniteScroll from 'react-infinite-scroll-component';


const CitiesTable = () => {

    const [cities, setCities]= useState([])

    const [searchBar, SetSearchBar] = useState ("")

    const [filterBar, setFilterBar] = useState ([])

    const [scroll, setScroll] = useState (true)

    const [page, setPage] = useState(1)

    const handleClick = (e, cities)=>{

      if(e.button == 2){
        window.open(`/weather/${cities}`, "_blank")
      }

    }
    
    const getCitiesData = async ()=>{
      try {
        const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${(page - 1) * 10}`;
        console.log("Request URL:", url); // Log the constructed URL
        const res = await axios.get(url);
        
        const moreCities = res.data.results;
    
        setCities(prevCities => [...prevCities, ...moreCities]);
        setPage(prevPage => prevPage + 1);
    
        if (moreCities.length === 0) {
          setScroll(false);
        }
      } catch (err) {
        console.log("Error", err);
      }
  }

    const handleSearchBar = (e)=>{
        SetSearchBar(e.target.value);
    }

    useEffect(()=>{

      const filterBar =  cities.filter((city)=>(
            city.name.toLowerCase().includes(searchBar.toLowerCase())
        ))

        setFilterBar(filterBar);

    },[cities,searchBar])

    useEffect(()=>{

       

        getCitiesData();

    },[])

//    console.log("state", cities);

  return (

    <div className='container mx-auto mt-10 relative blur-overlay'>
  <video className="absolute inset-0 w-full h-full object-cover" src={backgroundvideo} autoPlay loop muted></video>
  
  <div className="relative z-10">
    <h2 className='text-center text-3xl font-bold mb-5'>Welcome To Our Website</h2>
    
    <input type="text" className='ml-5 border-2 border-red-500 px-3 mb-2 py-4 rounded-lg w-[20%]' placeholder='Search here...' onChange={handleSearchBar} value={searchBar} />
    
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
          <InfiniteScroll
          dataLength={cities.length}
          next={getCitiesData}
          hasMore= {scroll}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }

          >

            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-lg font-medium text-gray-500 bg-black uppercase border-b border-gray-300"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-lg font-medium text-gray-500 bg-black uppercase border-b border-gray-300"
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-lg font-medium text-gray-500 bg-black uppercase border-b border-gray-300"
                  >
                    TimeZone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterBar.map((city, index) => (
                  <tr className="hover:bg-gray-100" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800" onContextMenu={(e)=>handleClick(e, city.name)}>
                      <Link to={`/weather/${city.name}`} target='_blank'>
                        {city.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {city.cou_name_en}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {city.timezone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  )
}

export default CitiesTable
