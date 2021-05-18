import React from 'react'

const WorldBooksContent = ({ setSort }) => {
    return (
        <div>
            <select className="select-option" onChange={e => setSort(e.target.value)}>
                <option value="1">Narxi pas</option>
                <option value="2">Narxi baland</option>
                <option value="3">A - Z gacha</option>
                <option value="4">Z - A gacha</option>
            </select>
        </div>
    )
}

export default WorldBooksContent
