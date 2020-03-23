// Get Access to DOM

const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitButton = document.getElementById('submit-button');

const url = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';


// Get Access to Response Section

const responseMessages = document.getElementById('response-message');
const responseTitle = document.getElementById('response-title');
const responseID = document .getElementById('response-id');
const responseContent = document.getElementById('response-content');

submitButton.addEventListener('click',($event) => {
    $event.preventDefault();
    const post = {
        title : titleInput.value,
        content : contentInput.value
    };

    submitFormData(post);
});

function makeRequest(data) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', url + '/create-post');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          if (request.status === 201) {
            resolve(JSON.parse(request.response));
          } else {
            reject(JSON.parse(request.response));
          }
        }
      };

      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(data));
    });
  }

  async function submitFormData(post){
      try {
        const requestPromise = makeRequest(post);
        const response = await requestPromise;
        responseMessages.textContent = response.message;
        responseTitle.textContent = response.post.title;
        responseID.textContent = response.post.id;
        responseContent.textContent = response.post.content;
      } 
      catch (errorResponse){
          responseMessages.textContent = errorResponse.error;
      }
  }




