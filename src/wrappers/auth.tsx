// import { Redirect } from 'umi'

import React from "react"

export default (props: any): React.ReactNode => {
  console.log(props)
  return props.children
  // return <Redirect to="/user/login" />
}