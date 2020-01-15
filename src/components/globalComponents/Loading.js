import React from 'react';

export default function Loading() {
    return (
        <div className="d-flex justify-content-center my-5">
            <div className="spinner-border  text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
