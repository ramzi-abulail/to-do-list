import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [checked1, setChecked1] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [searchPriority, setSearchPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/card')
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingCardId !== null) {
        const response = await axios.put(`http://localhost:3000/card/${editingCardId}`, {
          name: name,
          subject: subject,
          color: selectedColor,
          startDate: startDate,
          endDate: endDate,
        });
        console.log('Card updated successfully:', response.data);
        setEditingCardId(null);
      } else {
        const response = await axios.post('http://localhost:3000/card', {
          name: name,
          subject: subject,
          color: selectedColor,
          startDate: startDate,
          endDate: endDate,
        });

        console.log('Card created successfully:', response.data);
      }

      setName('');
      setSubject('');
      setSelectedColor('');
      setStartDate('');
      setEndDate('');
      fetchCards();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:3000/card');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleEditCard = (id) => {
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setName(cardToEdit.name);
      setSubject(cardToEdit.subject);
      setSelectedColor(cardToEdit.color);
      setStartDate(cardToEdit.startDate);
      setEndDate(cardToEdit.endDate);
      setEditingCardId(id);
    }
  };


  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/card/${id}`);
      console.log('Card deleted successfully:', id);
      fetchCards();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange1 = (event) => {
    setChecked1(event.target.checked);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handlePrioritySearch = (priority) => {
    setSearchPriority(priority);
  };

  const filteredCards = searchPriority
    ? cards.filter((card) => card.color.toLowerCase() === searchPriority.toLowerCase())
    : cards;

  return (
    <div className='bg-emerald-200 md:w-[800px] ml-[400px]'>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-4">Ramzi abulail</h1>

        <form onSubmit={handleSubmit} className="flex flex-col mt-8">
          <input
            type="text"
            placeholder="Card Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Card Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />

 

          <div>
            <br/>
            <input
              type="text"
              placeholder="Start Date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="End Date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />

          </div>
          <div className="flex mt-4 ">

            <div className='mr-4'>
              <a >what is the priority : </a>
            </div>
            <label className="mr-4">
              <input
                type="radio"
                value="green"
                checked={selectedColor === 'green'}
                onChange={() => handleColorChange('green')}
                className="mr-2"
              />
              low
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="yellow"
                checked={selectedColor === 'yellow'}
                onChange={() => handleColorChange('yellow')}
                className="mr-2"
              />
              medium
            </label>
            <label>
              <input
                type="radio"
                value="red"
                checked={selectedColor === 'red'}
                onChange={() => handleColorChange('red')}
                className="mr-2"
              />
              high
            </label>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            {editingCardId !== null ? 'Update Card' : 'Add Card'}
          </button>
        </form>

        {/* Priority Search Bar as Dropdown List */}
        <div className="flex mt-4">
          <div className='mr-10'>
            <a> search on priority :</a>
          </div>
          <select
            value={searchPriority}
            onChange={(e) => handlePrioritySearch(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select Priority</option>
            <option value="green">Low Priority</option>
            <option value="yellow">Medium Priority</option>
            <option value="red">High Priority</option>
          </select>
        </div>


        {/* Display Filtered Cards */}
        <div className="ml-40 mt-10 border border-black md:w-[500px] p-2">
          {filteredCards.map((card) => (
            <div key={card.id} className={`flex flex-col mb-4 border border-black bg-white ${card.color}`}>
              <div className="flex items-center justify-between ml-4 mt-2">
                <h2 className="text-xl font-bold mb-2">{card.name}</h2>
              </div>
              <hr />

              {/* Display the selected color inside the card */}
              <div style={{ backgroundColor: card.color }} className="h-8 w-full"></div>

              <hr /> {/* Horizontal line added here */}

              <p className="mt-2 ml-4 mb-4">{card.subject}</p>
              <p className="mt-2 ml-4 mb-4">Start Date: {card.startDate}</p>
              <p className="mt-2 ml-4 mb-4">End Date: {card.endDate}</p>

              <div className='ml-4 mt-8 mb-4'>
                <hr />
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-400 checked:bg-blue-500"
                    checked={checked1}
                    onChange={handleCheckboxChange1}
                  />
                  <label className="ml-2  text-gray-700">complete</label>
                </div>
              </div>
              <hr />

              <div className="flex items-center  mt-20 justify-around mb-2">
                <button
                  type="button"
                  onClick={() => handleEditCard(card.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCard(card.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;