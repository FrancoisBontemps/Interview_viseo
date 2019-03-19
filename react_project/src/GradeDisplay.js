import React from 'react';

const GRADE_NUMBER = 5;

export const GradeDisplay = ({ handleChange }) => (
    <div onClick={handleChange} id="aBtnGroup" className="btn-group">
        {[...Array(GRADE_NUMBER)].map((item, index) => (
            <button key={index} type="button" value={++index} className="btn btn-default">
                {index}
            </button>
        ))}
    </div>
);

