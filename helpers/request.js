const headerParams = (req, headerRequiredParams) => {
  let result = '';

  headerRequiredParams.forEach((headerParam) => {
    if (!req.headers[headerParam]) {
      result += `header.${headerParam}, `;
    }
  });

  return result ? `${result} ARE REQUIRED` : '';
};

const bodyParams = (req, headerRequiredParams) => {
  let result = '';

  headerRequiredParams.forEach((headerParam) => {
    if (!req.body[headerParam]) {
      result += `body.${headerParam}, `;
    }
  });

  return result ? `${result} ARE REQUIRED` : '';
};

module.exports = {
  bodyParams,
  headerParams,
};
