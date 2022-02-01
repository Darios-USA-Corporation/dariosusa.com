module.exports = (request, response) => {
    if (request.method === 'POST')
      response.status(200).send('OK');
    else
      response.status(400).send('Bad Request');
  };