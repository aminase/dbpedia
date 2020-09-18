import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import ReactJson from 'react-json-view'

const API_ROOT = 'http://dbpedia.org/data/Matteo_Donati.json'
const dataKey = 'http://dbpedia.org/resource/Matteo_Donati'
const ROOT = 'http://dbpedia.org/ontology'

const searchKeyMapper = {
  height: `${ROOT}/Person/height`,
  description: `${ROOT}/abstract`,
  thumbnail: `${ROOT}/thumbnail`,
  plays: `${ROOT}/plays`,
  country: `${ROOT}/country`,
}

export const Home: React.FC = () => {
  const [data, setData] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState('')
  const [dataSubset, setDataSubset] = useState({})

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
    console.log(searchTerm, 'search term')
    setSearchTerm(searchTerm)
    const targetKeyPath = _.get(searchKeyMapper, searchTerm)
    const dataSubset = _.get(data, targetKeyPath)
    setDataSubset(dataSubset)
    if (dataSubset) {
      setError('')
    } else {
      setError('No matching dbpedia data found')
    }
  }

  return (
    <div className="m-10">
      <div className="text-green-900 my-5">
        NOTE: You can look for Matteo Donati's {`${_.keys(searchKeyMapper)}`}
      </div>
      <input
        className="border-solid border-b outline-none w-full border-green-600 m-5"
        placeholder="Search"
        type="text"
        onChange={(e) => searchItem(e)}
      />
      {error !== '' && searchTerm !== '' && (
        <ErrorDisplay>{error}</ErrorDisplay>
      )}
      <br />
      {!_.isEmpty(dataSubset) && (
        <div className="p-5">
          <ReactJson src={{ dataSubset }} />
        </div>
      )}
    </div>
  )
}

const ErrorDisplay = ({ children }: any) => {
  return (
    <div className="text-red-700 px-4 py-3 rounded relative" role="alert">
      {children}
    </div>
  )
}
