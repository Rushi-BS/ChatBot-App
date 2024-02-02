
import React from "react"

export default function (props) {
  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Your Chat History</h3>
          
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              New chat +
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
