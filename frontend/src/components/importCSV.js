import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import axios from 'axios'

// CSV 입력 버튼
export default class ImportCSV extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    importCSV: PropTypes.string.isRequired,
  }

  // 버튼을 누를 경우 실행됩니다.
  // 파일을 받아 axios를 통해 backend에 post request를 날립니다.
  // 이후 input을 초기화 합니다.
  handleFileInput = (event) => {
    const {
      url,
    } = this.props

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)

    axios.post(url, formData)
    .then(res => {
      console.log(res.data)
      window.location.reload();
    }).catch(err => {
      console.log(err)
    })

    event.target.value = ""
  }

  // 버튼만 표시되고 input은 css로 인해 숨겨져 있습니다.
  render() {
    const {
      type,
      importCSV,
    } = this.props

    return (
      <div>
        <Button tag="label" htmlFor={type}>{importCSV}</Button>
        <input type="file" id={type} className="import_file" accept="text/csv" onChange={this.handleFileInput}/>
      </div>
    )
  }
}