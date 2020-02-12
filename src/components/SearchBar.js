import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'

const SearchBar = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchSearchData();
  }, [])

  const fetchSearchData = () => {
    axios.get('../data/sample.json')
      .then(res => {
        setData(prepareData(res))
      })
      .catch(err => {
        console.error(err)
      })
  }

  // prepare array for select options
  const prepareData = (res) => {
    let searchOptions = res.data.map(opt => ({ 
      label: `${opt.first_name} ${opt.last_name}`, value: opt._id, score: opt.score
    }));

    return searchOptions = searchOptions.sort((a,b) => {
      return a.score - b.score
    })
  }

  return (
    <div>
      <Select options={data} />
    </div>
  )
}

export default SearchBar