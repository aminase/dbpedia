import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

const API_ROOT = 'http://dbpedia.org/data/Matteo_Donati.json'

export const Home: React.FC = () => {
  const [data, setData] = useState({ hits: [] })
  const [search, setSearch] = useState('')
  const [name, setName] = useState({
    name: [{ first: 'AMina', value: 2, surname: 'Edo' }],
  })
  console.log(name.name[0]['value'], 'name')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_ROOT}/Matteo_Donati.json`)
      console.log(response, 'result 1')

      const height = _.get(response, `${API_ROOT}/ontology/height`, '')
      console.log(height, 'height')
    }
    fetchData()
  }, [])

  const parsing = parseInt('4F', 16)
  console.log(parsing, 'parse')

  const searchItem = (e: any) => {}

  const firstObject = { name: 'Edo' }
  firstObject.name = 'Amina'

  console.log(firstObject, 'objc')

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
