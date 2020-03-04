import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
const FeedbackStyle = {}

// size에 따라 h1 ~ h6을 반환합니다.
// 내용은 text로 채워집니다.
class Headers extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    const {
      size,
      text,
    } = this.props

    switch (size) {
      case 1:
        return <h1>{text}</h1>
      case 2:
        return <h2>{text}</h2>
      case 3:
        return <h3>{text}</h3>
      case 4:
        return <h4>{text}</h4>
      case 5:
        return <h5>{text}</h5>
      case 6:
        return <h6>{text}</h6>
      default:
        return <h2>{text}</h2>
    }
  }
}

// title에 사용됩니다.
// md는 bootstrap 속성이므로 건드릴 경우 레이아웃이 이상해질 수 있습니다.
// 특정 해상도에서만 사용할 것이기 때문에 md만 지정하였습니다.
// Title의 초기 size는 h2입니다.
// strings는 여러 언어 중 선택된, 현재 언어 오브젝트입니다.
export class Title extends Component {
  static propTypes = {
    md: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    md: {
      size: 8,
      offset: 2,
    },
    size: 2,
  }

  render() {
    const {
      md,
      size,
      title,
    } = this.props

    return (
      <Col md={md} className={FeedbackStyle.space}>
        <Headers size={size} text={title} />
      </Col>
    )
  }
}