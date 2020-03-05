/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 테이블 관련 라이브러리
import { Col, Row } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit'

import axios from 'axios'
import { Title } from './title'
import ImportCSV from './importCSV'
import DeleteAll from './deleteAll'

// settings.json을 통해 테이블 별 필드 값과 간격을 불러옵니다.
// width: 0은 전체(100%)에서 다른 width %를 뺀 나머지 값을 의미합니다.
import { columnFields } from 'settings'

// 한 페이지 당 목록 수, 페이지네이션 / 검색, CSV 저장을 담당합니다.
// 좌우 정렬되어 표 위아래로 출력됩니다.
function TableFunction({ paginationProps, tableProps, strings, type, url }) {
  const { SearchBar } = Search
  const { exportCSV } = strings
  const { ExportCSVButton } = CSVExport

  return (
    <div className="table-function">
      <div>
        <SizePerPageDropdownStandalone { ...paginationProps } />
        <PaginationListStandalone {...paginationProps} />
      </div>

      <div>
        <SearchBar {...tableProps.searchProps } />
        <ExportCSVButton
          className="btn-secondary"
          {...tableProps.csvProps}
        >
          {exportCSV}
        </ExportCSVButton>
        {
          type !== 'LogTable' &&
          <ImportCSV importCSV={strings.importCSV} type={type} url={url}/>
        }
      </div>
    </div>
  )
}

function contentTable({ paginationProps, paginationTableProps, strings, state, cellEdit }) {
  const {
    url,
    type,
    columns,
    limit,
    data,
    keyFieldIndex,
  } = state

  return (
    <ToolkitProvider
      keyField={columns[keyFieldIndex].dataField}
      data={data.slice(0, limit)}
      columns={columns}
      exportCSV={{
        fileName: type + "_" + Date() + ".csv",
        blobType: 'text/csv;charset=ansi',
      }}
      search
    >
    {
      props => (
        <Col md={{ size: 8, offset: 2 }}>
          <TableFunction
            paginationProps={paginationProps}
            tableProps={props}
            strings={strings}
            type={type}
            url={url}
          />
          <BootstrapTable
            { ...paginationTableProps }
            { ...props.baseProps }
            cellEdit={cellEdit}
            condensed
            striped
            hover
          />
          <TableFunction
            paginationProps={paginationProps}
            tableProps={props}
            strings={strings}
            type={type}
            url={url}
          />
          {
            type !== 'LogTable' &&
            <DeleteAll strings={strings.deleteAll} type={type} url={url} />
          }
        </Col>
      )
    }
    </ToolkitProvider>
  )
}

class ListTable extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    strings: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    keyFieldIndex: PropTypes.number.isRequired,
  }

  static defaultProps = {
    options: {
      custom: true,
    },
    keyFieldIndex: 0,
  }

  state = {
    title: "",
    columns: [],
    data: [],
    keyFieldIndex: 0,
  }

  constructor(props) {
    super(props)
    this.state = this.makeInitialState()
  }

  makeInitialState() {
    const {
      url,
      type,
      strings,
      keyFieldIndex,
    } = this.props

    const columnField = columnFields[type]
    
    return {
      ...this.state,
      url: url,
      type: type,
      title: strings[type].title,
      columns: columnField.map(({ field, width }) => ({
        dataField: field,
        csvText: field,
        csvExport: field !== 'id',
        text: strings[type].field[field],
        style: {
          width: width,
        },
        sort: true,
      })),
      keyFieldIndex: keyFieldIndex,
    }
  }

  // localhost:3000으로부터 데이터를 불러옵니다.
  componentDidMount() {
    const {
      url,
    } = this.props
    
    axios.get(url)
    .then(res => {
      this.handler({
        data: res.data,
      })
    })
  }
  
  handler = (state) => {
    this.setState({
      ...this.state,
      ...state,
    })
  }

  render() {
    const {
      strings,
      options,
    } = this.props

    const {
      title,
    } = this.state
    
    return (
      <Row>
        <Title title={title}/>
        <PaginationProvider pagination={paginationFactory(options)}>
          { (props) => contentTable({
              ...props,
              strings: strings,
              state: this.state,
            })
          }
        </PaginationProvider>
      </Row>
    )
  }
}

class UserTable extends ListTable {
  static defaultProps = {
    ...super.defaultProps,
    type: "UserTable",
    url: `http://localhost:3000/user`,
    keyFieldIndex: 1,
  }
}

class SeatTable extends ListTable {
  static defaultProps = {
    ...super.defaultProps,
    type: "SeatTable",
    url: `http://localhost:3000/seat`,
  }
}

class LogTable extends ListTable {
  static defaultProps = {
    ...super.defaultProps,
    type: "LogTable",
    url: `http://localhost:3000/log`,
  }
}

export { UserTable, SeatTable, LogTable }