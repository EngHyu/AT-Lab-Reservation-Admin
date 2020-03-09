import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import Popup from 'reactjs-popup'
import axios from 'axios'

// 자료 삭제 버튼
// 누르면 확인 여부를 묻는 팝업이 뜹니다.
export default class DeleteAll extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    strings: PropTypes.object.isRequired,
  }

  // 팝업에서 확인 버튼을 누르면 실행됩니다.
  // axios를 통해 backend에 delete request를 날립니다.
  handleClick = (event, close) => {
    const {
      url,
    } = this.props

    axios.delete(url)
    .then(res => {
      if (res.changes !== 0)
        window.location.reload()
    }).catch(err => {
      console.log(err)
    })

    close()
  }

  render() {
    const {
      type,
      strings,
    } = this.props

    const trigger = <Button tag="label" color="danger" className="delete_all">{strings.title}</Button>

    return (
      <Popup trigger={trigger} modal>
        {close => (
          <div>
            <a className="close" onClick={close}>&times;</a>
            <div className="header">{strings.title}</div>
            <div className="content">
              <span>{type} {strings.text}</span>
            </div>
            <div className="actions">
              <Button
                block={true}
                color='primary'
                onClick={close}>
                {strings.cancel}
              </Button>
              <Button
                block={true}
                color='danger'
                onClick={(event) => this.handleClick(event, close)}>
                {strings.submit}
              </Button>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}