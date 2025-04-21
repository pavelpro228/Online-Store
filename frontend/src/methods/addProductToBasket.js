export const addProductToBasket = async (product) => {
  try {
      const response = await fetch('/api/baskets', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product)
      })
      const data = await response.json()
      if (data.message)
        alert(data.message)
      if (data.error)
        alert(data.error)
  } catch (error) {
    console.log(error)
  }
}