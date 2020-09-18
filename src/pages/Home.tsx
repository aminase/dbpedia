import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import ReactJson from 'react-json-view'

const API_ROOT = 'http://dbpedia.org/data/Matteo_Donati.json'

const dataKey = 'http://dbpedia.org/resource/Matteo_Donati'
// const heightKey = "http://dbpedia.org/ontology/Person/height";

const searchKeyMapper = {
  height: 'http://dbpedia.org/ontology/Person/height',
  weight: 'sadf',
}

export const Home: React.FC = () => {
  const [data, setData] = useState({ hits: [] })
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [dataSubset, setDataSubset] = useState({})

  const [name, setName] = useState({
    name: [{ first: 'AMina', value: 2, surname: 'Edo' }],
  })

  console.log(name.name[0]['value'], 'name')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_ROOT}`)
      const data = _.get(response.data, dataKey)

      setData(data)
    }
    fetchData()
  }, [])

  const searchItem = (e: any) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)

    const targetKeyPath = _.get(searchKeyMapper, searchTerm)

    const dataSubset = _.get(data, targetKeyPath)
    setDataSubset(dataSubset)

    if (dataSubset) {
      setError('')
    } else {
      setError('No matching dbpedia data found')
    }

    console.log('searchTerm---', searchTerm)
    console.log('dataSubset---', dataSubset)
  }

  return (
    <div className="m-10">
      <input
        className="border-solid border-b outline-none w-full border-green-600 p-2"
        placeholder="Search"
        type="text"
        onChange={(e) => searchItem(e)}
      />
      {error !== '' && searchTerm !== '' && <>{error}</>}

      <br />
      {!_.isEmpty(dataSubset) && <ReactJson src={{ dataSubset }} />}
    </div>
  )
}
