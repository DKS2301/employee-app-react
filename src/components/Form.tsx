import React from 'react'
import paperclip from '../assets/images/paperclip.svg'
import InputGroup from './InputGroup'
import Button from './Button'

function Form() {
  return (
    <form className="card">

      <InputGroup
        label="Employee Name"
        id="employee-name"
      />

      <InputGroup
        label="Joining Date"
        id="joining-date"
        type="date"
      />

      <InputGroup
        label="Role"
        id="role"
        variant="select"
        options={[
          { value: "SWE" },
          { value: "QA" },
        ]}
      />

      <InputGroup
        label="Status"
        id="status"
        variant="select"
        options={[
          { value: "Active" },
          { value: "Terminated" },
        ]}
      />

      <InputGroup
        label="Experience"
        id="experience"
      />

      <div className="input-group">
        <label htmlFor="address">Address</label>

        <input
          id="address"
          placeholder="Address Line 1"
        />

        <div className="address-group">
          <input placeholder="Address Line 2" />
          <input placeholder="City" />
          <input placeholder="Country" />
          <input placeholder="Postal Code" />
        </div>
      </div>

      <label
        className="file-upload"
        htmlFor="id-proof"
      >
        <p>Upload ID Proof</p>

        <input
          id="id-proof"
          type="file"
        />

        <div>
          <img
            src={paperclip}
            alt="file upload icon"
          />
          <p>Attach files</p>
        </div>
      </label>

      <div className="button-group">
        <Button typeName='submit' className='primary' label='Create'/>
        <Button typeName='button' className='outline' label='Cancel'/>
      </div>

    </form>
  )
}

export default Form