export const deleteProductFromBasket = async (id) => {
try {
    const response = await fetch('/api/delete-products-from-basket', {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({ _id: id }),
    })
    const data = await response.json()
    alert(data.message)
}   catch (error) {
        console.log(error)
    }
}