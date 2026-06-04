import React from 'react'
import Card from '../../components/Card'
import TitleCard from '../../components/TitleCard'
import add from '../../assets/images/add.svg'
import dropdown from '../../assets/images/dropdown.svg'

function EmployeeList() {
  return (
    <Card>
        <TitleCard label='Employee List'>
            <div className='add-props'>
                <label htmlFor='status'>
                Filter By
                </label>
                <div>

                <select id='status'>
                    <option>Status</option>
                </select>
                <img src={dropdown}/>
                </div>
                <button type='submit'>
                 <img src={add} alt='add'/>
                    Create Employee
                </button>
            </div>
        </TitleCard>
    </Card>  )
}

export default EmployeeList