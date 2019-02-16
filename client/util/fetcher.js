export default url => async (path, method, header, data, isImage) => {
  try {
    let body;
    if (isImage) body = data;
    else body = JSON.stringify(data);

    const response = await fetch(`${url}${path}`, {
      method,
      body,
      headers: new Headers(header),
    });

    const json = await response.json();
    return {
      status: response.status,
      data: json,
    };
  } catch (e) {
    return {
      status: 500,
      data: null,
      message: e,
    };
  }
};
