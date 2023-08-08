import React from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux' //import connect from react-redux
import { Spin, Space } from 'antd'; //import loading antd component. Spin and Space are components of antd for loading and spacing. 

//if isShowLoading is true, show loading component. 
function Loading({ isShowLoading }) {
    if (isShowLoading) {
        return (
            <div className="zingLoading" id="zingLoading">
                <div className="gtWaving">
                    <Space size="middle">
                        <Spin style={{ color: '#ee4d2d' }} size="large" />
                    </Space>
                </div>
            </div>
        )
    }
    return null
}
//map redux state to props. Get isShowLoading from commonReducer and pass to Loading component.
const mapStateToProps = function (state) {
    return {
        isShowLoading: state.commonReducer.showLoading,
    }
}

export default connect(mapStateToProps)(Loading)
