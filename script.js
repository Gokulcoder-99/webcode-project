const head = document.createElement('h1');
head.innerText = 'Nationalize API Project';

const form = document.createElement('form');
form.id = 'form';

const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'name');
nameLabel.textContent = 'Name: ';

const nameInput = document.createElement('input');
nameInput.setAttribute('type', 'text');
nameInput.setAttribute('id', 'name');
nameInput.setAttribute('name', 'name');

const titleLabel = document.createElement('label');
titleLabel.setAttribute('for', 'title');
titleLabel.textContent = 'Title: ';

const titleInput = document.createElement('input');
titleInput.setAttribute('type', 'text');
titleInput.setAttribute('id', 'title');
titleInput.setAttribute('name', 'title');

const typeLabel = document.createElement('label');
typeLabel.setAttribute('for', 'type');
typeLabel.textContent = 'Type: ';

const typeInput = document.createElement('input');
typeInput.setAttribute('type', 'text');
typeInput.setAttribute('id', 'type');
typeInput.setAttribute('name', 'type');

const yearLabel = document.createElement('label');
yearLabel.setAttribute('for', 'year');
yearLabel.textContent = 'Year: ';

const yearInput = document.createElement('input');
yearInput.setAttribute('type', 'text');
yearInput.setAttribute('id', 'year');
yearInput.setAttribute('name', 'year');

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Search';

const resultDiv = document.createElement('div');
resultDiv.setAttribute('id', 'result');

form.append(
  nameLabel,
  nameInput,
  document.createElement('br'),
  titleLabel,
  titleInput,
  document.createElement('br'),
  typeLabel,
  typeInput,
  document.createElement('br'),
  yearLabel,
  yearInput,
  document.createElement('br'),
  submitButton
);

document.body.append(head,form, resultDiv);
// Get the form and input elements
const formvalue = document.getElementById('form');
const nameinput = document.getElementById('name');
const titleinput = document.getElementById('title');
const typeinput = document.getElementById('type');
const yearinput = document.getElementById('year');

// Add an event listener to the form submit button
formvalue.addEventListener('submit', async (e) => {
  e.preventDefault();//prevent default method help to stop window default function in this case it help in stop reloading of page.

  try {
    // Get the input data
    const name = nameinput.value.trim();//trim function eliminate space before and after the string
    const title = titleinput.value.trim();
    const type = typeinput.value.trim();
    const year = yearinput.value.trim();

    // Call the Nationalize API with the input data
    const response = await fetch(`https://api.nationalize.io/?name=${name}&title=${title}&type=${type}&year=${year}`);

    // Handle errors
    if (response ===false) {
      throw new Error('API request failed');
    }

    // Parse the API response
    const data = await response.json();
    const { country: [{ country_id: country1, probability: probability1 }, { country_id: country2, probability: probability2 }] } = data;

    // Display the results
    const result = document.getElementById('result');
    result.innerHTML = `
      <p>Top 2 countries: ${country1} (${probability1}), ${country2} (${probability2})</p>
    `;

    // Implement search filters and highlight the text
    const searchText = name + title + type + year;
    const filterRegex = new RegExp(searchText, 'gi');
    const filteredHTML = result.innerHTML.replace(filterRegex, `<mark>${searchText}</mark>`);
    result.innerHTML = filteredHTML;
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
});
