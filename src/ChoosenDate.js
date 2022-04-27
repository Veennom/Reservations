import React from "react";

const ChoosenDate = ({ selected }) => {
    return (
        <div style={{ marginLeft: 55, color: 'green' }}>
            <h3>
                {selected}
            </h3>
        </div>
    );
};

export default ChoosenDate;