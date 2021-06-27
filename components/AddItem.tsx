import React, { useState } from 'react';

const AddItem = () => {
  const [name, setName] = useState('');
  return (
    <form
      method="post"
      action="/users"
      className="max-w-xl w-full rounded-lg shadow-lg p-4 flex md:flex-row flex-col mt-4"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-lg tracking-wide">Add a new User</h3>
        <p className="text-gray-500 my-1">
          <input
            className="rounded-lg p-4 border mr-0 text-gray-800 border-gray-200 bg-white"
            placeholder="User name"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
      </div>
      {name && (
        <div className="md:px-2 mt-3 md:mt-0 items-center flex">
          <button className="bg-blue-500 text-white font-bold px-4 py-2 text-sm uppercase rounded tracking-wider focus:outline-none hover:bg-blue-600">
            Add
          </button>
        </div>
      )}
    </form>
  );
};

export default AddItem;
