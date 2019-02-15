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
    const goodStatus = /^[2-3][0-9][0-9]$/;
    return {
      status: response.status,
      data: goodStatus.test(response.status) ? json : null,
    };
  } catch (e) {
    return {
      status: 500,
      data: null,
      message: e,
    };
  }
};
