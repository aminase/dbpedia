import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

const API_ROOT = 'http://dbpedia.org'

export const Home: React.FC = () => {
  const [data, setData] = useState({ hits: [] })
  const [search, setSearch] = useState('')
  const [name, setName] = useState({
    name: [{ first: 'AMina', value: 2, surname: 'Edo' }],
  })
  console.log(name.name[0]['value'], 'name')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_ROOT}/resource/Matteo_Donati`)
      console.log(response, 'result 1')

      const height = _.get(response, `${API_ROOT}/ontology/height`, 'value')
      console.log(height, 'height')
    }
    fetchData()
  }, [])

  const searchItem = (e: any) => {}

  return (
    <div className="m-10">
      <input
        className="border-solid border-b outline-none w-full border-green-600 p-2"
        placeholder="Search"
        type="text"
        onChange={(e) => searchItem(e)}
      />
      {/* {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))} */}
    </div>
  )
}
